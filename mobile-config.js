App.accessRule('*', { type: 'navigation' })
App.accessRule('*')

App.info({
  id: 'com.recepozen.app',
  name: 'Recep Özen',
  description: '',
  author: 'Recep',
  email: 'recep@bordo.io',
  website: 'https://recepozen.com',
  version: '1.0.0',
})

App.setPreference('Orientation', 'portrait')
App.setPreference('target-device', 'handset')
App.setPreference('deployment-target', '13.0')
App.setPreference('android-targetSdkVersion', '30')
App.configurePlugin('cordova-plugin-autostart', {
  AUTO_START: true,
})

App.appendToConfig(`
  <edit-config target="NSLocationWhenInUseUsageDescription" file="*-Info.plist" mode="merge">
    <string>Hizmet bölgenizi seçmenizi kolaylaştırmak için konum bilginizi kullanıyoruz.</string>
  </edit-config>
  
  <edit-config target="NSCameraUsageDescription" file="*-Info.plist" mode="merge">
    <string>Resim ve Video gönderme sırasında kameranızı kullanıyoruz.</string>
  </edit-config>

  <config-file parent="/manifest" target="AndroidManifest.xml" xmlns:android="http://schemas.android.com/apk/res/android"> 
    <uses-permission android:name="android.permission.RECEIVE_BOOT_COMPLETED" /> 
    <uses-permission android:name="android.permission.FOREGROUND_SERVICE" /> 
    <uses-permission android:name="android.permission.SYSTEM_ALERT_WINDOW" /> 
    <uses-permission android:name="android.permission.USE_FULL_SCREEN_INTENT" /> 
  </config-file>

  <preference name="AndroidInsecureFileModeEnabled" value="true" />

  <plugin name="phonegap-plugin-barcodescanner" />
`)
