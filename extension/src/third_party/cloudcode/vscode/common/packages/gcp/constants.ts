/**
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @fileoverview added by tsickle
 * Generated from: third_party/cloudcode/vscode/common/packages/gcp/constants.ts
 * @suppress {checkTypes} added by tsickle
 * @suppress {extraRequire} added by tsickle
 * @suppress {missingRequire} added by tsickle
 * @suppress {uselessCode} added by tsickle
 * @suppress {suspiciousCode} added by tsickle
 * @suppress {missingReturn} added by tsickle
 * @suppress {unusedLocalVariables} added by tsickle
 * @suppress {missingOverride} added by tsickle
 * @suppress {const} added by tsickle
 */
goog.module('google3.third_party.cloudcode.vscode.common.packages.gcp.constants');
var module = module || { id: 'third_party/cloudcode/vscode/common/packages/gcp/constants.closure.js' };
goog.require('google3.third_party.javascript.tslib.tslib');
/** @type {string} */
exports.CREATE_PROJECT_URI = 'https://console.cloud.google.com/projectcreate';
/** @type {string} */
exports.DEPENDENCY_PATH_CONFIG_KEY = 'cloudcode.dependencyPaths';
/** @type {string} */
exports.GCLOUD_HEAD = `HEAD`;
/** @type {!Array<string>} */
exports.REQUIRED_COMPONENTS = ['alpha', 'beta', 'gke-gcloud-auth-plugin', 'kubectl', 'skaffold', 'minikube'];
/** @type {!Array<string>} */
exports.COMPONENT_INSTALL_COMMAND = ['components', 'install', ...exports.REQUIRED_COMPONENTS];
/** @type {!Array<string>} */
exports.UPDATE_COMMAND = ['components', 'update'];
/**
 * DependencyStatus indicates the status of the Cloud Code dependency check.
 *
 * @enum {string}
 */
const DependencyStatus = {
    /**
     * UNCHECKED is the status prior to initializing dependency management.
     */
    UNCHECKED: "unchecked",
    /**
     * INITIALIZING is the status when dependency management is still determing what to do, for example
     * install, update, etc.
     */
    INITIALIZING: "initializing",
    /**
     * INSTALLING_GCLOUD indicates that dependency management is currently installing the gcloud CLI.
     */
    INSTALLING_GCLOUD: "installing_gcloud",
    /**
     * INSTALLING_COMPONENTS indicates that dependency management is currently installing gcloud components.
     */
    INSTALLING_COMPONENTS: "installing_components",
    /**
     * UPDATING indicates that gcloud/components are currently being updated
     */
    UPDATING: "updating",
    /**
     * SUCCEEDED indicates that the dependency management phase was completed successfully.
     */
    SUCCEEDED: "succeeded",
    /**
     * FAILED indicates that the dependency management phase has failed.
     */
    FAILED: "failed",
    /**
     * MANUAL indicates that user has opted for manually managing dependencies.
     */
    MANUAL: "manual",
};
exports.DependencyStatus = DependencyStatus;
/**
 * Establishes the keys for the VS Code global and/or workspace memento store
 * @enum {string}
 */
const MementoKey = {
    CACHED_PROJECTS: "CACHED_PROJECTS_MEMENTO_KEY",
    CLOUDRUN_DEPLOY_SETTINGS: "cloudcode.cloudrun.deploy-settings",
    GCP_PROJECT_ID_BY_ACCOUNT: "cloudcode.gcp-project-id-by-account",
    KUBERNETES_CLEANUP_PROMPT: "cloudcode.kubernetes.cleanup.prompt",
    KUBERNETES_LAST_USED_CONTEXT: "cloudcode.kubernetes.last-used-context",
    LAST_USED_SKAFFOLD_BUILD_ENV: "cloudcode.skaffold.last-used-build-env",
    OPEN_NEW_APP_LOCATION: "cloudcode.open-new-app-location",
    README_TO_OPEN: "cloudcode.readme-file-to-open",
    SHOW_AGENT_TIPS_CARD: "cloudcode.show-agent-tips-card",
    SHOW_TIPS_CARD: "cloudcode.show-tips-card",
    SUPPRESS_MINIMUM_VERSION_MESSAGE: "SUPRESS_MINIMUM_VERSION_MESSAGE",
};
exports.MementoKey = MementoKey;
/**
 * Extension ID of C# extension.
 * @type {string}
 */
exports.CSHARP_EXT_ID = 'ms-dotnettools.csharp';
/**
 * URL to Go Debug help.
 * @type {string}
 */
exports.CSHARP_DEBUG_URL = 'https://cloud.google.com/code/docs/vscode/debug#net-core';
/**
 * Extension ID of Go extension.
 * @type {string}
 */
exports.GO_EXT_ID = 'golang.go';
/**
 * URL to Go Debug help.
 * @type {string}
 */
exports.GO_DEBUG_URL = 'https://cloud.google.com/code/docs/vscode/debug#go';
/**
 * Extension ID of Python extension.
 * @type {string}
 */
exports.PYTHON_EXT_ID = 'ms-python.python';
/**
 * URL to Python Debug help.
 * @type {string}
 */
exports.PYTHON_DEBUG_URL = 'https://cloud.google.com/code/docs/vscode/debug#python';
/**
 * Extension ID of Java extension.
 * @type {string}
 */
exports.JAVA_EXT_ID = 'vscjava.vscode-java-debug';
/**
 * Extension ID of RedHat Java support
 * @type {string}
 */
exports.REDHAT_JAVA_EXT_ID = 'redhat.java';
/**
 * URL to Java Debug help.
 * @type {string}
 */
exports.JAVA_DEBUG_URL = 'https://cloud.google.com/code/docs/vscode/debug#java';
/**
 * URL to Node Debug help.
 * @type {string}
 */
exports.NODE_DEBUG_URL = 'https://cloud.google.com/code/docs/vscode/debug#nodejs';
/**
 * Cloud Code yaml config file name
 * @type {string}
 */
exports.CLOUDCODE_TEMPLATE_YAML_CONFIG_NAME = 'template.yaml';
/**
 * Skaffold config file name
 * @type {string}
 */
exports.SKAFFOLD_CONFIG_NAME = 'skaffold.yaml';
/**
 * Cloud Code default for skaffold default timeout in minutes to wait on
 * resource deletions.
 * @type {number}
 */
exports.SKAFFOLD_RESOURCE_DELETION_TIMEOUT_MINS = 2;
/**
 * Launch config for skaffold default timeout in minutes to wait on resource
 * deletions.
 * @type {string}
 */
exports.RESOURCE_DELETION_TIMEOUT_CONFIG = 'resourceDeletionTimeoutMins';
/**
 * Vscode launch config file name
 * @type {string}
 */
exports.VSCODE_LAUNCH_CONFIG_NAME = 'launch.json';
/**
 * Default Gcp Image Registry Template
 * @type {string}
 */
exports.DEFAULT_GCP_IMAGE_REGISTRY_TEMPLATE = 'gcr.io/${gcpProjectId}';
/**
 * Vscode folder
 * @type {string}
 */
exports.VSCODE_FOLDER = '.vscode';
/**
 * The name of the Deployment resource kind
 * @type {string}
 */
exports.DEPLOYMENT_KIND = 'Deployment';
/**
 * The name of the Service resource kind
 * @type {string}
 */
exports.SERVICE_KIND = 'Service';
/**
 * The name of the LoadBalancer Service Type
 * @type {string}
 */
exports.LOADBALANCER_SERVICE_TYPE = 'LoadBalancer';
/** @type {string} */
exports.INGRESS_KIND = 'Ingress';
/**
 * The config key of the extension under which all the extension
 * specific debug configuration is stored.
 * @type {string}
 */
exports.DEBUG_CONFIG_KEY = 'cloudcode.debug-kubernetes';
/**
 * A regex to match against the error message reported from running `skaffold
 * init` on Cloud Code without a Dockerfile to containerize the application.
 * b/356720063
 * @type {!RegExp}
 */
exports.SKAFFOLD_INIT_MISSING_DOCKERFILE_ERR_MSG_REGEX = new RegExp('.*one or more valid build configuration must be present to build images with Skaffold.*provide at least one build config and try again.*', 'i');
/**
 * A more user-friendly error message to end users for the error described in
 * SKAFFOLD_INIT_MISSING_DOCKERFILE_ERR_MSG_REGEX. b/356720063
 * @type {string}
 */
exports.SKAFFOLD_INIT_MISSING_DOCKERFILE_USER_FRIENDLY_ERR_MSG = 'Failed to containerize your application ro run on Cloud Run. Please ensure Dockerfile is present in the project to proceed with Cloud Run deployment.';
/**
 * Debug Config settings used for the config corresponding
 * with DEBUG_CONFIG_KEY.
 * @type {{SUPPRESS_NET_CORE_WARNING: string, SUPPRESS_JAVA_WARNING: string, SUPPRESS_PYTHON_WARNING: string, SUPPRESS_NODE_JS_WARNING: string, SUPPRESS_GO_WARNING: string}}
 */
exports.DEBUG_CONFIG_SETTINGS = {
    // Various debug config keys for suppressing warnings.
    SUPPRESS_NET_CORE_WARNING: 'suppressNETCoreWarning',
    SUPPRESS_JAVA_WARNING: 'suppressJavaWarning',
    SUPPRESS_PYTHON_WARNING: 'suppressPythonWarning',
    SUPPRESS_NODE_JS_WARNING: 'suppressNodeJSWarning',
    SUPPRESS_GO_WARNING: 'suppressGoWarning',
};
/**
 * Contains information to uniquely identify
 * a cluster in a KubeConfig.
 * @record
 */
function KubeClusterContext() { }
exports.KubeClusterContext = KubeClusterContext;
/* istanbul ignore if */
if (false) {
    /**
     * @type {(undefined|string)}
     * @public
     */
    KubeClusterContext.prototype.context;
    /**
     * @type {(undefined|string)}
     * @public
     */
    KubeClusterContext.prototype.kubeConfigPath;
}
/**
 * Base config key for cloudcode extension.
 * @type {string}
 */
exports.CLOUDCODE_CONFIG_KEY = 'cloudcode';
/**
 * Cloud Code kubernetes config type.
 * @type {string}
 */
exports.CLOUDCODE_KUBERNETES_CONFIG_TYPE = 'cloudcode.kubernetes';
/**
 * Cloud Code cloud run config type.
 * @type {string}
 */
exports.CLOUDCODE_CLOUDRUN_CONFIG_TYPE = 'cloudcode.cloudrun';
/**
 * Cloud Code cloud functions config type.
 * @type {string}
 */
exports.CLOUDCODE_CLOUDFUNCTIONS_CONFIG_TYPE = 'cloudcode.cloudfunctions';
/**
 * Skaffold use gcloud authentication config
 * @type {string}
 */
exports.CLOUDCODE_SKAFFOLD_GCLOUD_AUTH = 'cloudcode.useGcloudAuthSkaffold';
/**
 * Skaffold skip any unreachable directions when running init
 * @type {string}
 */
exports.CLOUDCODE_SKAFFOLD_SKIP_UNREACHABLE_DIRS = 'cloudcode.enableSkaffoldSkipUnreachableDirs';
/**
 * Cloud Run temporary directory prefix
 * @type {string}
 */
exports.CLOUDRUN_TEMP_DIR_PREFIX = 'cloud-code-cloud-run-';
/**
 * Cloud Run kubeconfig temporary directory prefix
 * @type {string}
 */
exports.CLOUDRUN_KUBECONFIG_TEMP_DIR_PREFIX = 'cloud-code-cloud-run-kubeconfig-';
/**
 * Name of the generated kubernetes manifest file
 * @type {string}
 */
exports.CLOUDRUN_DEFAULT_K8S_MANIFEST_FILE_NAME = 'pods_and_services.yaml';
/**
 * Config setting for minikube binary path.
 * @type {string}
 */
exports.MINIKUBE_PATH = 'minikubePath';
/**
 * IMAGE_REGISTRY variable used as a placeholder for the image registry
 * @type {string}
 */
exports.IMAGE_REGISTRY = 'IMAGE_REGISTRY';
/**
 * The config key of the profile registry map.
 * @type {string}
 */
exports.IMAGE_REGISTRY_MAP_CONFIG_KEY = 'cloudcode.profile-registry-map';
/**
 * The config key of the profile cluster map.
 * @type {string}
 */
exports.PROFILE_CLUSTER_MAP_CONFIG_KEY = 'cloudcode.profile-cluster-map';
/**
 * The config key of the last used context.
 * @type {string}
 */
exports.LAST_USED_CONTEXT_CONFIG_KEY = 'cloudcode.last-used-context';
/**
 * The config key for GKE-Autopilot deployment support.
 * @type {string}
 */
exports.AUTO_GKE_SUPPORT_CONFIG_KEY = 'cloudcode.enableGkeAutopilotSupport';
/**
 * The config key for automatically displaying welcome/release notes. Internal
 * setting.
 * @type {string}
 */
exports.SHOW_WELCOME_OR_RELEASE_NOTES_CONFIG_KEY = 'cloudcode.showWelcomeOrReleaseNotes';
/**
 * The config key of KubeConfigs array.
 * @type {string}
 */
exports.KUBECONFIGS_KEY = 'cloudcode.kubeconfigs';
/**
 * The config key of the active KubeConfig.
 * @type {string}
 */
exports.ACTIVE_KUBECONFIG_KEY = 'cloudcode.active-kubeconfig';
/**
 * The config key that controls updating adc on Cloud SDK login.
 * @type {string}
 */
exports.UPDATE_ADC_ON_LOGIN_KEY = 'cloudcode.updateAdcOnLogin';
/**
 * The config key that controls if we should enable gcp-auth on a run/debug
 * session.
 * @type {string}
 */
exports.ENABLE_GCP_AUTH_KEY = 'cloudcode.enableMinikubeGcpAuthPlugin';
/**
 * The config key that controls whether config less run debug experience should
 * be enabled or not for both kubernetes and cloud run apps.
 * @type {string}
 */
exports.ENABLE_CONFIG_LESS_KEY = 'cloudcode.enableConfigLessExperience';
/**
 * The config key that controls what shell to use for 'Get Terminal'.
 * @type {string}
 */
exports.KUBECTL_EXEC_SHELL = 'cloudcode.kubectlExecShell';
/**
 * The globalState key that shows if the "don't show again" button has been
 * selected on the ADC prompt.
 * @type {string}
 */
exports.ADC_PROMPT_NOSHOW = 'cloudcode.adcPromptNoShow';
/**
 * The config key that suppresses warning message about update adc flag.
 * @type {string}
 */
exports.UPDATE_ADC_WARNING_SUPPRESS = 'cloudcode.suppressUpdateAdcChangesPrompt';
/**
 * The config key to enable the support for multiple skaffold configs
 * @type {string}
 */
exports.ENABLE_MULTI_SKAFFOLD_CONFIGS_KEY = 'cloudcode.enableMultiSkaffoldConfigsKey';
/**
 * Key to fetch the cloud run service location
 * @type {string}
 */
exports.CLOUDRUN_SERVICE_LOCATION_LABEL_KEY = 'cloud.googleapis.com/location';
/**
 * Service name of Cloud Run
 * @type {string}
 */
exports.CLOUDRUN_SERVICE_NAME = 'run.googleapis.com';
/**
 * Service name of Cloud Build
 * @type {string}
 */
exports.CLOUDBUILD_SERVICE_NAME = 'cloudbuild.googleapis.com';
/**
 * Config key, storing whether we want to use cli-installer-managed
 * dependencies.
 * @type {string}
 */
exports.AUTO_INSTALL_CONFIG_KEY = 'cloudcode.autoDependencies';
/**
 * Config key used by RedHat Java extension that denotes whether
 * gradle import is enabled.
 * @type {string}
 */
exports.REDHAT_JAVA_GRADLE_IMPORTER_KEY = 'java.import.gradle.enabled';
/**
 * Prefix to denote the current cluster
 * @type {string}
 */
exports.CURRENT_CLUSTER_PREFIX = '[Current] ';
/**
 * Prefix to denote the last used context
 * @type {string}
 */
exports.LAST_USED_CONTEXT_PREFIX = '[Last Used] ';
/**
 * YAML resource separator
 * @type {string}
 */
exports.YAML_RESOURCE_SEPARATOR = '---';
/**
 * Global state key to track whether or not cloud shell readme was previously
 * shown.
 * @type {string}
 */
exports.CLOUD_SHELL_PREVIOUSLY_OPENED = 'cloudcode.cloudShellReadmeShown';
/**
 * The default profile name
 * @type {string}
 */
exports.DEFAULT_PROFILE = '[default]';
/**
 * Key name of the annotation where Kubernetes stores the
 * last-applied-configuration of any Kubernetes resource.
 * @type {string}
 */
exports.LAST_APPLIED_CONFIG = 'kubectl.kubernetes.io/last-applied-configuration';
/**
 * The metrics ID that uniquely identifies us in Cloud SDK's logs.
 * @type {string}
 */
exports.CLOUDSDK_METRICS_ID = 'cloudcode.vscode';
/** @type {string} */
exports.DEFAULT_MINIKUBE_CONTEXT = 'minikube';
/** @type {string} */
exports.DEFAULT_DOCKER_FOR_DESKTOP_CONTEXT = 'docker-for-desktop';
/** @type {string} */
exports.DEFAULT_DOCKER_DESKTOP_CONTEXT = 'docker-desktop';
/** @type {string} */
exports.MINIKUBE_GCP_AUTH_PLUGIN_NAME = 'gcp-auth';
/** @type {number} */
exports.DEFAULT_PAGE_SIZE = 50;
/** @type {number} */
exports.TEST_PAGE_SIZE = 100;
/** @type {string} */
exports.VERBOSE_LOGGING_GCLOUD = 'cloudcode.cloudSdkVerbosityLevel';
/** @type {string} */
exports.KUBECTL_REQUEST_TIMEOUT_CONFIG_KEY = 'cloudcode.kubectlRequestTimeout';
/** @type {string} */
exports.CLOUDRUN_ENV_K_SERVICE_KEY = 'K_SERVICE';
/** @type {string} */
exports.SHARED_EXPLORER_CHOOSE_PROJECT_CMD = 'cloudcode.sharedExplorer.chooseProject';
/** @type {string} */
exports.CLOUDRUN_ENV_K_REVISION_KEY = 'K_REVISION';
/** @type {string} */
exports.CLOUDRUN_LOCAL_DEV_ENV_K_REVISION_VALUE = 'local';
/** @type {string} */
exports.CLOUDRUN_ENV_K_CONFIGURATION_KEY = 'K_CONFIGURATION';
/** @type {string} */
exports.DEPLOY_TO_CLOUDRUN_OUTPUT_CHANNEL_NAME = 'Deploy to Cloud Run';
/** @type {string} */
exports.CONTAINER_APP_ROOT_VARIABLE = '${containerAppRoot}';
/** @type {string} */
exports.MINIKUBE_CLOUDRUN_PROFILE_NAME = 'cloud-run-dev-internal';
/** @type {string} */
exports.SHOW_STATUS_BAR_CONTEXT = 'cloudcode.show-status-bar-context-prompt';
// Args: Region, service name
/** @type {string} */
exports.CLOUDRUN_MANAGED_CONSOLE_LINK = 'https://console.cloud.google.com/run/detail/%s/%s?project=%s';
/** @type {string} */
exports.CLOUDRUN_API_NAME = 'run.googleapis.com';
/** @type {string} */
exports.SQL_COMPONENT_API_NAME = 'sql-component.googleapis.com';
/** @type {string} */
exports.SQL_ADMIN_API_NAME = 'sqladmin.googleapis.com';
/** @type {string} */
exports.CONTAINER_REGISTRY_API_NAME = 'containerregistry.googleapis.com';
/** @type {string} */
exports.ARTIFACT_REGISTRY_API_NAME = 'artifactregistry.googleapis.com';
/** @type {string} */
exports.CLOUD_BUILD_API_NAME = 'cloudbuild.googleapis.com';
/** @type {string} */
exports.CLOUD_RUN_API_NAME = 'run.googleapis.com';
/** @type {string} */
exports.GCLOUD_INSTALL_COOKIE_KEY = 'cloudcode-gcloud-install-cookie';
/** @type {string} */
exports.GCLOUD_COMPONENT_INSTALL_COOKIE_KEY = 'cloudcode-gcloud-component-update-cookie';
/** @type {string} */
exports.GCLOUD_UPDATE_COOKIE_KEY = 'cloudcode-gcloud-update-cookie';
/** @type {string} */
exports.CLOUD_CODE_SYNCHRONOUS_INSTALL = 'CLOUD_CODE_SYNCHRONOUS_INSTALL';
/** @type {string} */
exports.CLOUD_CODE_BYPASS_INSTALLER_INITIALIZE = 'CLOUD_CODE_BYPASS_INSTALLER_INITIALIZE';
/** @type {string} */
exports.CLOUD_CODE_ENABLE_CODE_COV = 'CLOUD_CODE_ENABLE_CODE_COV';
/** @type {string} */
exports.CLOUD_CODE_YAML_SUPPORT_LOG_FILE = 'CLOUD_CODE_YAML_SUPPORT_LOG_FILE';
/** @type {string} */
exports.MINIKUBE_STATUS_BAR_CONFIG_KEY = 'cloudcode.minikubeStatusBar';
/** @type {string} */
exports.CLOUD_CODE_CLIENT_NAME = 'Cloud Code for VS Code';
/** @type {string} */
exports.KUBE_SYSTEM_NAMESPACE = 'kube-system';
/** @type {string} */
exports.NAT_SETUP_LEARN_MORE_URL = 'https://cloud.google.com/code/docs/vscode/configure-private-cluster#accessing_resources_outside_from_clusters';
/** @type {string} */
exports.SKIP_UNREACHABLE_DIR_FLAG = '--skip-unreachable-dirs';
/** @type {{UNAUTHORIZED: number, FORBIDDEN: number}} */
exports.HTTP_STATUS = {
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
};
/** @enum {string} */
const DEPENDENCIES_TEST_ENV_VAR_NAME = {
    INSTALL_MINIKUBE_NIGHTLY: "INSTALL_MINIKUBE_NIGHTLY",
    INSTALL_GCLOUD_NIGHTLY: "INSTALL_GCLOUD_NIGHTLY",
    CLOUDCODE_TEST_AUTOINSTALL_OFF: "CLOUDCODE_TEST_AUTOINSTALL_OFF",
    CLOUDCODE_TEST_BRANCH: "CLOUDCODE_TEST_BRANCH",
};
exports.DEPENDENCIES_TEST_ENV_VAR_NAME = DEPENDENCIES_TEST_ENV_VAR_NAME;
/** @type {{CLOUDCODE_ADD_CLUSTER_TO_CONFIG: string, CLOUDCODE_CANCEL_KUBECTL_CLUSTER_PROXY: string, CLOUDCODE_CREATE_SECRET_COMMAND: string, CLOUDCODE_DEBUG_CLOUD_RUN_APP: string, CLOUDCODE_DEBUG_CLOUD_RUN_APP_EXPLORER_TITLE: string, CLOUDCODE_DEBUG_CLOUD_RUN_APP_STATUS_BAR: string, CLOUDCODE_DEBUG_KUBERNETES_APP: string, CLOUDCODE_DEBUG_KUBERNETES_APP_EXPLORER_TITLE: string, CLOUDCODE_DEBUG_KUBERNETES_APP_STATUS_BAR: string, CLOUDCODE_DEPLOY_CLOUD_RUN_APP: string, CLOUDCODE_DEPLOY_CLOUD_RUN_APP_STATUS_BAR: string, CLOUDCODE_FOCUS_API_EXPLORER: string, CLOUDCODE_FOCUS_CR_EXPLORER: string, CLOUDCODE_FOCUS_GCE_EXPLORER: string, CLOUDCODE_FOCUS_GCF_EXPLORER: string, CLOUDCODE_FOCUS_K8S_EXPLORER: string, CLOUDCODE_FOCUS_SECRETS_EXPLORER: string, CLOUDCODE_OPEN_CHANGE_LOGS_TREE: string, CLOUDCODE_OPEN_CHANGE_LOGS_WELCOME_PAGE: string, CLOUDCODE_REFRESH_CLOUD_RUN_EXPLORER: string, CLOUDCODE_REPORT_ISSUE_WELCOME_PAGE: string, CLOUDCODE_RUN_CLOUD_RUN_APP: string, CLOUDCODE_RUN_CLOUD_RUN_APP_EXPLORER_TITLE: string, CLOUDCODE_RUN_CLOUD_RUN_APP_STATUS_BAR: string, CLOUDCODE_RUN_KUBERNETES_APP: string, CLOUDCODE_RUN_KUBERNETES_APP_EXPLORER_TITLE: string, CLOUDCODE_RUN_KUBERNETES_APP_STATUS_BAR: string, CLOUDCODE_SETUP_KUBECTL_CLUSTER_PROXY: string, CLOUDCODE_SETUP_PRIVATE_NODES_CLOUD_NAT: string, CLOUDCODE_STATUS_BAR_COMMAND: string, CLOUDCODE_WELCOME_PAGE_STATUS_BAR: string, VSCODE_DIFF: string, VSCODE_OPEN: string, VSCODE_OPEN_FOLDER: string, VSCODE_OPEN_GLOBAL_KEYBINDINGS: string, VSCODE_OPEN_SETTINGS: string, VSCODE_SHOW_EXTENSION_WITH_IDS: string, VSCODE_SHOW_MARKDOWN_PREVIEW: string, CLOUDCODE_STATUS_BAR_PROJECT_SELECT: string, CLOUDCODE_INSTALL_DEPENDENCIES: string, GCLOUD_STATUS_BAR_COMMAND: string}} */
exports.COMMAND = {
    CLOUDCODE_ADD_CLUSTER_TO_CONFIG: 'cloudcode.addClusterToConfig',
    CLOUDCODE_CANCEL_KUBECTL_CLUSTER_PROXY: 'cloudcode.cancelKubectlClusterProxy',
    CLOUDCODE_CREATE_SECRET_COMMAND: 'cloudcode.secrets.create',
    CLOUDCODE_DEBUG_CLOUD_RUN_APP: 'cloudcode.debugCloudRunApp',
    CLOUDCODE_DEBUG_CLOUD_RUN_APP_EXPLORER_TITLE: 'cloudcode.debugCloudRunAppExplorerTitle',
    CLOUDCODE_DEBUG_CLOUD_RUN_APP_STATUS_BAR: 'cloudcode.statusbar.debugCloudRunApp',
    CLOUDCODE_DEBUG_KUBERNETES_APP: 'cloudcode.debugKubernetesApp',
    CLOUDCODE_DEBUG_KUBERNETES_APP_EXPLORER_TITLE: 'cloudcode.debugK8sAppExplorerTitle',
    CLOUDCODE_DEBUG_KUBERNETES_APP_STATUS_BAR: 'cloudcode.statusbar.debugK8sApp',
    CLOUDCODE_DEPLOY_CLOUD_RUN_APP: 'cloudcode.deployCloudRunApp',
    CLOUDCODE_DEPLOY_CLOUD_RUN_APP_STATUS_BAR: 'cloudcode.statusbar.deployCloudRunApp',
    CLOUDCODE_FOCUS_API_EXPLORER: 'cloudcode.apiExplorer.focusView',
    CLOUDCODE_FOCUS_CR_EXPLORER: 'cloudcode.cloudRunExplorer.focusView',
    CLOUDCODE_FOCUS_GCE_EXPLORER: 'cloudcode.gceExplorer.focusView',
    CLOUDCODE_FOCUS_GCF_EXPLORER: 'cloudcode.gcfExplorer.focusView',
    CLOUDCODE_FOCUS_K8S_EXPLORER: 'cloudcode.kubectlExplorer.focusView',
    CLOUDCODE_FOCUS_SECRETS_EXPLORER: 'cloudcode.secretsExplorer.focusView',
    CLOUDCODE_OPEN_CHANGE_LOGS_TREE: 'cloudcode.changeLogsExplorer',
    CLOUDCODE_OPEN_CHANGE_LOGS_WELCOME_PAGE: 'cloudcode.changeLogsWelcomePage',
    CLOUDCODE_REFRESH_CLOUD_RUN_EXPLORER: 'cloudcode.refreshCloudRunExplorer',
    CLOUDCODE_REPORT_ISSUE_WELCOME_PAGE: 'cloudcode.reportIssueWelcomePage',
    CLOUDCODE_RUN_CLOUD_RUN_APP: 'cloudcode.runCloudRunApp',
    CLOUDCODE_RUN_CLOUD_RUN_APP_EXPLORER_TITLE: 'cloudcode.runCloudRunAppExplorerTitle',
    CLOUDCODE_RUN_CLOUD_RUN_APP_STATUS_BAR: 'cloudcode.statusbar.runCloudRunApp',
    CLOUDCODE_RUN_KUBERNETES_APP: 'cloudcode.runKubernetesApp',
    CLOUDCODE_RUN_KUBERNETES_APP_EXPLORER_TITLE: 'cloudcode.runK8sAppExplorerTitle',
    CLOUDCODE_RUN_KUBERNETES_APP_STATUS_BAR: 'cloudcode.statusbar.runkubernetesApp',
    CLOUDCODE_SETUP_KUBECTL_CLUSTER_PROXY: 'cloudcode.setupKubectlClusterProxy',
    CLOUDCODE_SETUP_PRIVATE_NODES_CLOUD_NAT: 'cloudcode.gke.setupPrivateNodesCloudNat',
    CLOUDCODE_STATUS_BAR_COMMAND: 'cloudcode.statusbarCommand',
    CLOUDCODE_WELCOME_PAGE_STATUS_BAR: 'cloudcode.welcomeStatusBar',
    VSCODE_DIFF: 'vscode.diff',
    VSCODE_OPEN: 'vscode.open',
    VSCODE_OPEN_FOLDER: 'vscode.openFolder',
    // TODO(b/314847105): Organize top-level and disparate command constants in
    // their own file.
    VSCODE_OPEN_GLOBAL_KEYBINDINGS: 'workbench.action.openGlobalKeybindings',
    VSCODE_OPEN_SETTINGS: 'workbench.action.openSettings',
    VSCODE_SHOW_EXTENSION_WITH_IDS: 'workbench.extensions.action.showExtensionsWithIds',
    VSCODE_SHOW_MARKDOWN_PREVIEW: 'markdown.showPreview',
    CLOUDCODE_STATUS_BAR_PROJECT_SELECT: 'cloudcode.statusbar.projectselector.selectproject',
    CLOUDCODE_INSTALL_DEPENDENCIES: 'cloudcode.gcloud.install',
    GCLOUD_STATUS_BAR_COMMAND: 'cloudcode.statusbar.openQuickPick',
};
/**
 * Event emitted by DeploymentManager.
 * @enum {string}
 */
const DeploymentEvent = {
    START_BUILD: "StartBuild",
    PORT_FORWARD: "PortForward",
    POST_DEPLOYMENT: "PostDeployment",
    EXIT_PROCESS: "Exit",
    DEBUGGING_CONTAINER: "DebuggingContainer",
};
exports.DeploymentEvent = DeploymentEvent;
