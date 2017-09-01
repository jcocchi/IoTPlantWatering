## Log into Subscription ##

Login-AzureRmAccount
Get-AzureRmSubscription
$SubId = 
Set-AzureRmContext -SubscriptionId $SubId


#### Deploy from GitHub #####

$assetLocation = "https://raw.githubusercontent.com/jcocchi/IoTPlantWatering/master/ServiceFabricCluster/" 
$templateFileURI  = $assetLocation + "plantdeploy.json" 
$parameterFileURI = $assetLocation + "plantcluster.parameters.json" 

$SFRG = "plantcluster"
$locationRegion = "westus"
New-AzureRmResourceGroup -Name $SFRG -Location $locationRegion

New-AzureRmResourceGroupDeployment -ResourceGroupName $SFRG -TemplateParameterUri $parameterFileURI -TemplateUri $templateFileURI -verbose

### Deploy Service Fabric Cluster (from Local File) ###

$SFRG = "plantcluster"
$locationRegion = "westus"
$TemplateLocation = 
$ParametersLocation = 

New-AzureRmResourceGroup -Name $SFRG -Location $locationRegion
Test-AzureRmResourceGroupDeployment -ResourceGroupName $SFRG -TemplateFile $TemplateLocation -TemplateParameterFile $ParametersLocation -Verbose
New-AzureRmResourceGroupDeployment -ResourceGroupName $SFRG -TemplateFile $TemplateLocation -TemplateParameterFile $TemplateLocation -Verbose

