Configuration ClientWebServer            
{            
    Import-DscResource -ModuleName PSDesiredStateConfiguration, cChoco, xSystemSecurity, xNetworking         
    Node localhost            
    {       
      cChocoInstaller installChoco
      {
        InstallDir = "C:\Program Files (x86)\choco"
      }
      
      cChocoPackageInstaller installNodejs-lts
      {
         Ensure = 'Present'
         Name = "nodejs-lts"
         DependsOn = "[cChocoInstaller]installChoco"
      }

      cChocoPackageInstaller installvisualstudiocode
      {
         Ensure = 'Present'
         Name = "visualstudiocode"
         DependsOn = "[cChocoInstaller]installChoco"
      }
     
      xIEEsc EnableIEEscAdmin
        {
            IsEnabled = $False
            UserRole  = "Administrators"
        }
      xIEEsc EnableIEEscUser
        {
            IsEnabled = $False
            UserRole  = "Users"
        }

      xFirewall Firewall
      {
        Name                  = 'ClientWebAppFirewallRule'
        DisplayName           = 'Firewall Rule for ClientWebApp'
        Group                 = 'IoTPlantApps'
        Ensure                = 'Present'
        Enabled               = 'True'
        Profile               = ('All')
        Direction             = 'InBound'
        RemotePort            = ('3000')
        LocalPort             = ('3000')
        Protocol              = 'TCP'
        Description           = 'Firewall Rule for ClientWebApp'
        
    }

    }
}