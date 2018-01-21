import * as ReleaseActions from './release.actions';
import { SW360Release } from './../../resources/resources.api';
import * as fromRoot from './../../state';

export enum ReleaseContext {
  components = 'components',
  projects = 'projects'
}

export interface State {
  releases: SW360Release[];
  release?: SW360Release;
  releaseContext: ReleaseContext;
}

const initialState: State = {
  releases: [],
  releaseContext: ReleaseContext.components
}

export function releaseReducer(state = initialState, action: ReleaseActions.All): State {

  switch (action.type) {

    // TODO: check if release context is only neccessary for list or for detail, too?
    case ReleaseActions.REDUCE_RELEASES: {
      return { ...state, releases: action.releases, releaseContext: action.context }
    }

    case ReleaseActions.REDUCE_RELEASE: {
      return { ...state, release: action.release }
    }

    default: return state;
  }

}

export const selectReleases = (state: fromRoot.State) => state.release.releases;
export const selectRelease = (state: fromRoot.State) => state.release.release;
export const selectReleaseContext = (state: fromRoot.State) => state.release.releaseContext;

