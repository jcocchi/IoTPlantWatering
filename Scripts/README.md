# In This Section

To test the applications fully, we deployed them in several ways - as a full VM, a container and via Service Fabric

## VM

To ensure we had working code and to confirm the steps for installing the application properly, we built a standard Windows 2016 Server and installed all the necessary requirements to be a mini-dev environment. This was particularly important for the ClientWeb application, as we needed access to a local web browser to confirm that the website was working before advancing to configuring external access, as well as letting us troubleshoot and test directly.

To ease the re-deployment, the ClientWebServerDSConfig.ps1 and .zip files are used to automatically install Node.js and Visual Studio Code via Chocolatey. The configuration also makes some necessary firewall and IE security adjustments.

The clientwebserverdeploy.json file is used to deploy the VM to Azure via the command line. The username and password for the server admin account are prompted for at the time of deployment.  (Though for additional automation, those values could be pulled from Azure Key Vault.)

## Containers

Under the nodejs folder, there is a dockerfile used to create a Windows Server Core container and install Node.js using the HybridInstaller.ps1 script.

This container image was then used as the basis of our application containers.

## Service Fabric

This folder has just the PowerShell commands to deploy a Service Fabric cluster from template manually.
