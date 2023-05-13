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
App.setPreference('android-targetSdkVersion', '31')

App.appendToConfig(`
  <edit-config target="NSLocationWhenInUseUsageDescription" file="*-Info.plist" mode="merge">
    <string>Hizmet bölgenizi seçmenizi kolaylaştırmak için konum bilginizi kullanıyoruz.</string>
  </edit-config>
  
  <edit-config target="NSCameraUsageDescription" file="*-Info.plist" mode="merge">
    <string>Resim ve Video gönderme sırasında kameranızı kullanıyoruz.</string>
  </edit-config>
`)
