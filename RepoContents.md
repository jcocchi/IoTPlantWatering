# What's in this Repo?

While the application code is used irregardless of the infrastructure supporting it, parts of the repository won't be used depending on the deployment method. The contents of this repository is as follows:

* Clientwebapp folder - Contains the code for the front-end web application. The dockerfile is needed only if the application will be containerized for deployment. 
* Images folder - contains images used for the documentation for this repo. 
* ReceiveHubMessages folder - Contains the code for the API application that moves messages from the IoT Hub to the CosmoDB database.  The dockerfile is needed only if the applciation will be containerized for deployment.
* Scripts - Containers - Nodejs folder - Contains the dockerfile and powershell scripts to create the base windows container with NodeJS installed.
* Scripts - Containers - ACS folder - Contains JSON files used to deploy containers to a Kubernetes ACS cluster.
* Scripts - Service Fabric folder - Contains PowerShell notes for creation of a Service Fabric Cluster
* Scripts - VM folder - Contains ARM template and PowerShell files for creating a host VM to run both applications on a single machine, with our without containers.
* Service Fabric Cluster folder - ARM template for deploying a secure service fabric cluster.
* ServiceFabricPackages folder - Contains service fabric package deployments.
* SimulatedDevice folder - Code for a simulated device to connect to the IoT hub.

