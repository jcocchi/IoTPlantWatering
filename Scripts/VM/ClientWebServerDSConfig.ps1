Configuration ClientWebServer            
{            
    Import-DscResource -ModuleName PSDesiredStateConfiguration, cChoco, xSystemSecurity          
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

    }
}