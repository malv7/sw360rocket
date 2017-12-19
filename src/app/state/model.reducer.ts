import * as Models from './models';
import * as ModelActions from './model.actions';
import * as fromRoot from './../reducers';

interface UserMap {
  [key: string]: Models.User;
}

interface ProjectMap {
  [key: string]: Models.Project;
}

interface SW360ComponentMap {
  [key: string]: Models.SW360Component;
}

interface ReleaseMap {
  [key: string]: Models.Release;
}

interface AttachmentMap {
  [key: string]: Models.Attachment;
}

interface VendorMap {
  [key: string]: Models.Vendor;
}

interface LicenseMap {
  [key: string]: Models.License;
}

export interface State {
  users?: Models.EmbeddedUser[];
  user?: Models.User;
  userMap: UserMap;

  projects?: Models.EmbeddedProject[];
  project?: Models.Project;
  projectMap: ProjectMap;

  components?: Models.EmbeddedSW360Component[];
  component?: Models.SW360Component;
  componentMap: SW360ComponentMap;

  releases?: Models.EmbeddedRelease[];
  release?: Models.Release;
  releaseMap: ReleaseMap;

  attachment?: Models.Attachment;
  attachmentMap: AttachmentMap;

  vendors?: Models.EmbeddedVendor[];
  vendor?: Models.Vendor;
  vendorMap: VendorMap;

  licenses?: Models.EmbeddedLicense[];
  license?: Models.License;
  licenseMap: LicenseMap;
}

const initialState: State = {
  userMap: {},
  projectMap: {},
  componentMap: {},
  releaseMap: {},
  attachmentMap: {},
  vendorMap: {},
  licenseMap: {}
};

export function modelReducer(state = initialState, action: ModelActions.All) {
  switch (action.type) {

    case ModelActions.GET_USERS: {
      return { ...state, users: action.users };
    }

    case ModelActions.GET_USER: {
      state.userMap[action.user._links.self.href] = action.user;
      return { ...state, user: action.user };
    }

    case ModelActions.GET_PROJECTS: {
      return { ...state, projects: action.projects };
    }

    case ModelActions.GET_PROJECT: {
      state.projectMap[action.project._links.self.href] = action.project;
      return { ...state, project: action.project };
    }

    case ModelActions.GET_COMPONENTS: {
      return { ...state, components: action.components };
    }

    case ModelActions.GET_COMPONENT: {
      state.componentMap[action.component._links.self.href] = action.component;
      return { ...state, component: action.component };
    }

    case ModelActions.GET_RELEASES: {
      return { ...state, releases: action.releases };
    }

    case ModelActions.GET_RELEASE: {
      state.releaseMap[action.release._links.self.href] = action.release;
      return { ...state, release: action.release };
    }

    case ModelActions.GET_ATTACHMENT: {
      state.attachmentMap[action.attachment._links.self.href] = action.attachment;
      return { ...state, attachment: action.attachment };
    }

    case ModelActions.GET_VENDORS: {
      return { ...state, vendors: action.vendors };
    }

    case ModelActions.GET_VENDOR: {
      state.vendorMap[action.vendor._links.self.href] = action.vendor;
      return { ...state, vendor: action.vendor };
    }

    case ModelActions.GET_LICENSES: {
      return { ...state, licenses: action.licenses };
    }

    case ModelActions.GET_LICENSE: {
      state.licenseMap[action.license._links.self.href] = action.license;
      return { ...state, license: action.license };
    }

    default:
      return state;
  }
}

export const selectUser = (state: fromRoot.State) => state.model.user;
export const selectUsers = (state: fromRoot.State) => state.model.users;
export const selectUserMap = (state: fromRoot.State) => state.model.userMap;

export const selectProject = (state: fromRoot.State) => state.model.project;
export const selectProjects = (state: fromRoot.State) => state.model.projects;
export const selectProjectMap = (state: fromRoot.State) => state.model.projectMap;

export const selectComponent = (state: fromRoot.State) => state.model.component;
export const selectComponents = (state: fromRoot.State) => state.model.components;
export const selectComponentMap = (state: fromRoot.State) => state.model.componentMap;

export const selectRelease = (state: fromRoot.State) => state.model.release;
export const selectReleases = (state: fromRoot.State) => state.model.releases;
export const selectReleaseMap = (state: fromRoot.State) => state.model.releaseMap;

export const selectAttachment = (state: fromRoot.State) => state.model.attachment;
export const selectAttachmentMap = (state: fromRoot.State) => state.model.attachmentMap;

export const selectVendor = (state: fromRoot.State) => state.model.vendor;
export const selectVendors = (state: fromRoot.State) => state.model.vendors;
export const selectVendorMap = (state: fromRoot.State) => state.model.vendorMap;

export const selectLicense = (state: fromRoot.State) => state.model.license;
export const selectLicenses = (state: fromRoot.State) => state.model.licenses;
export const selectLicenseMap = (state: fromRoot.State) => state.model.licenseMap;