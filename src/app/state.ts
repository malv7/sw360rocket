import { State as StructureState } from './structure/state/structure.reducer';
import { State as ComponentState } from './component/state/component.reducer';
import { State as TableState } from './shared/tables/state/table.reducer';
import { State as ProjectState } from './project/state/project.reducer';
import { State as RouterState } from './router/state/router.reducer';
import { State as ModelState } from './state/model.reducer';
import { State as ReleaseState } from './release/state/release.reducer';

export interface State {
  component: ComponentState;
  project: ProjectState;
  release: ReleaseState;
  table: TableState;
  router: RouterState;
  model: ModelState;
  structure: StructureState;
}
