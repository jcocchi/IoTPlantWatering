# Infrastructure Deployment Options

The options below detail some of the ways you can deploy this application. 

## Option 1 - Node API and Node Web App as Guest Executables on Service Fabric

1. **Create Application and Service Manifest files** - This can be done manually or via Visual Studio with the Azure SDK installed. As Node.js isn't included on the cluster nodes by default, it needs to be included in the package along with the application. 
1. **Connect to the Cluster** - For an unsecure cluster, this is easily accomplished via PowerShell from a subscription holder with access to the cluster deployment. For a secure cluster, the access requires a registered certificate or the cluster needs to be registered as an Azure AD application 
1. **Upload and Register Application with Fabric Service** - this copies the application to the fabric storage area for applcation and registers it so it's deployable, via PowerShell or Azure CLI. PowerShell code available.
1. **Deploy Application Service Instance on Desired Number of Nodes** - This can be completed via PowerShell or Azure CLI.  PowerShell code available.

Roadbumps: Including Node.js binaries as part of the application package has been challenging as documentation for this process is either outdated or unclear. 

## Security Goals for Service Fabric

When deploying to a Service Fabric Cluster, the recommended installation of the cluster is via a secure mode requiring server certificates. This required the set up of the following additional components:

- _Self-Signed Server Certificates_ - self signed certificates are not recommended for production level deployment, but for testing purposes they are usuable. Server certificates are used to secure the communication between Azure and the cluster and between the clustered servers themselves. For this project the certificates were created using PowerShell.
- _Azure Key Vault_ - In order to deploy the cluster with the certificates, they needed to be stored in a location accessible to the Azure subscription holder. Certificates were added to the Azure Key Vault using PowerShell.
- _Client Access via Certificates or Azure Active Directory_ - For access to the cluster for application deployment and management, either client certificates or Azure AD access is suggested. (In Progress)

Note: As the Self-Signed Client Certificate component has not yet been completed, unsecured Service Fabric Clusters have been using for testing.

## Service Fabric Deployment Templates

For the secure cluster deployment, we used ARM templates that can be deployed via Azure CLI or PowerShell. Creating unsecure clusters can be done quickly using the Azure Portal, so we do not have an ARM template created for that.

References: [Deploy Multiple Application to Service Fabric] (https://docs.microsoft.com/en-us/azure/service-fabric/service-fabric-deploy-multiple-apps)

## Option 2 - Node API and Node Web App as Containers on Service Fabric Cluster

This opinion potential eliminates the need to include the Node.js and related dependancies within the application package. Instead the Application and Service manifest files would deploy a Guest Container with the application already installed.  

1. **Create a Windows Container with Node.js installed** - While there is plenty of documentation on how to do this with a Linux container, doing so with Windows container is more challenging due to the recommended installation process for Node.js is the MSI file. A PowerShell script was located that does a hybrid, silent installation of Node.js. The script was updated to install the lastest version of Node.js. (Completed)
1. Create a docker file to install the Client Web application or the RecieveHubMessages application. (Completed)
1. Create application and service manifests to deploy the container.

Roadblocks/ToDos: Ran into errors related to networking and port mapping from the container through service fabric. May need to experiment more with endpoints and proxy features for fabric clusters.

References: [Running Windows Containers on Azure Service Fabric](https://loekd.wordpress.com/2017/02/08/running-windows-containers-on-azure-service-fabric/)


## Option 3 - Node API and Node Web App as Containers on Azure Container Service (or Azure Container Instances)

In order to filter out errors related to service or application manifest configuration, deployment of the containers directly to Azure Container Service.

1. **Create a Container Service on Azure** - Azure supports three orchestrator options for containers on Azure (Docker Swarm, DC/OS and Kubernetes.) Only Kubernetes supports Windows Containers at this time. [Walkthrough Here.](https://docs.microsoft.com/en-us/azure/container-service/container-service-kubernetes-windows-walkthrough)
1. **Deploy Container** - using Kubectl command line.

For even faster deployment, Azure Container Instance deployment of a container without providing the complete container service infrastructure.

References: [How to Connect to a Running Windows Container](https://github.com/artisticcheese/artisticcheesecontainer/wiki/Logging-into-running-container)

## Option 4 - Node API and Node Web App as Native Applications on Windows Server 2016 VM

Building a VM to support this application provides us the greatest opportunity to troubleshoot the redeployment of this application, however it is not an easily scalable solution.

1. Build Windows Server 2016 as an Azure VM - this is most effectively done using an ARM template combined with a DSC configuration template to configure firewall port openings and install additional software.
1. Install Node.js - Installed using DSC and Chocolatey
1. Install Client Web Application (not automated)
1. Install Node API Application (not automated)

## Option 5 - Node API and Node Web App on Azure App Services

1. Node API Application deployed as Azure Function or Azure App Service
1. Node Web App deployed as Web App on Azure PaaS.