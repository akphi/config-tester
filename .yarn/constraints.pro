constraints_min_version(1).

% This file is written in Prolog
% It contains rules that the project must respect.
% In order to see them in action, run `yarn constraints source`

% This rule will enforce that a workspace MUST depend on the same version of a dependency as the one used by the other workspaces
gen_enforced_dependency(WorkspaceCwd, DependencyIdent, DependencyRange2, DependencyType) :-
  % Iterates over all dependencies from all workspaces
    workspace_has_dependency(WorkspaceCwd, DependencyIdent, DependencyRange, DependencyType),
  % Iterates over similarly-named dependencies from all workspaces (again)
    workspace_has_dependency(OtherWorkspaceCwd, DependencyIdent, DependencyRange2, DependencyType2),
  % Ignore peer dependencies
    DependencyType \= 'peerDependencies',
    DependencyType2 \= 'peerDependencies'.

% This rule will prevent workspaces from depending on non-workspace versions of available workspaces
gen_enforced_dependency(WorkspaceCwd, DependencyIdent, WorkspaceRange, DependencyType) :-
  % Iterates over all dependencies from all workspaces
    workspace_has_dependency(WorkspaceCwd, DependencyIdent, DependencyRange, DependencyType),
  % Only consider those that target something that could be a workspace
    workspace_ident(DependencyCwd, DependencyIdent),
  % Obtain the version from the dependency
    workspace_field(DependencyCwd, 'version', DependencyVersion),
  % Quirk: we must discard the workspaces that don't declare a version
    atom(DependencyVersion),
  % Only proceed if the dependency isn't satisfied by a workspace
    \+ project_workspaces_by_descriptor(DependencyIdent, DependencyRange, DependencyCwd),
  % Derive the expected range from the version
    (
      DependencyType \= 'peerDependencies' ->
        atom_concat('workspace:^', DependencyVersion, WorkspaceRange)
      ;
        atom_concat('^', DependencyVersion, WorkspaceRange)
    ).

% This rule enforces that all packages that depend on `webpack` or `rollup` must also depend on `@babel/runtime`
% because when we use either bundler tools, it means we use `babel` compiler
gen_enforced_dependency(WorkspaceCwd, '@babel/runtime', 'range', 'dependencies') :-
    (
      workspace_has_dependency(WorkspaceCwd, 'webpack', _, 'devDependencies')
      ;
      workspace_has_dependency(WorkspaceCwd, 'rollup', _, 'devDependencies')
    ),
  % Only proceed if the workspace doesn't already depend on `@babel/runtime`
    \+ workspace_has_dependency(WorkspaceCwd, '@babel/runtime', _, _).

% Required to display information in NPM properly
gen_enforced_field(WorkspaceCwd, 'license', 'MIT') :-
  workspace(WorkspaceCwd),
  % Private packages aren't covered
    \+ workspace_field_test(WorkspaceCwd, 'private', 'true').
gen_enforced_field(WorkspaceCwd, 'repository.type', 'git') :-
  workspace(WorkspaceCwd),
  % Private packages aren't covered
    \+ workspace_field_test(WorkspaceCwd, 'private', 'true').
gen_enforced_field(WorkspaceCwd, 'bugs.url', 'https://github.com/akphi/config-tester/issues') :-
  workspace(WorkspaceCwd),
  % Private packages aren't covered
    \+ workspace_field_test(WorkspaceCwd, 'private', 'true').
gen_enforced_field(WorkspaceCwd, 'repository.url', 'https://github.com/akphi/config-tester.git') :-
  workspace(WorkspaceCwd),
  % Private packages aren't covered
    \+ workspace_field_test(WorkspaceCwd, 'private', 'true').
gen_enforced_field(WorkspaceCwd, 'repository.directory', WorkspaceCwd) :-
  workspace(WorkspaceCwd),
  % Private packages aren't covered
    \+ workspace_field_test(WorkspaceCwd, 'private', 'true').
gen_enforced_field(WorkspaceCwd, 'homepage', HomepageUrl) :-
  workspace(WorkspaceCwd),
  atom_concat('https://github.com/akphi/config-tester/tree/master/', WorkspaceCwd, HomepageUrl),
  % Private packages aren't covered
    \+ workspace_field_test(WorkspaceCwd, 'private', 'true').

