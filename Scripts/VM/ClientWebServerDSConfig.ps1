Configuration ClientWebServer            
{            
    Import-DscResource -ModuleName PSDesiredStateConfiguration, cChoco, xSystemSecurity, xDSCFirewall         
    Node localhost            
    {       
      cChocoInstaller installChoco
      {
        InstallDir = "C:\Program Files (x86)\choco"
      }

      cChocoPackageInstaller installGit
      {
         Ensure = 'Present'
         Name = "git"
         DependsOn = "[cChocoInstaller]installChoco"
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

      xDSCFirewall Firewall
        {
            Name                  = "ClientWebApp"
            DisplayName           = "Firewall Rule for ClientWebApp"
            DisplayGroup          = "PlantApps"
            Ensure                = "Present"
            Access                = "Allow"
            State                 = "Enabled"
            Profile = {
            "Domain",
            "Public"
         };
            Direction             = "InBound"
            RemotePort            = ("3000")
            LocalPort             = ("3000")         
            Protocol              = "TCP"
         }

    }
}