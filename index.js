addEventListener('scheduled', event => {
  event.waitUntil(handleScheduledEvent())
})

async function handleScheduledEvent() {
  try {
    const names = ['BM4LQC', 'BM4LQC-8', 'BV8SI-9', 'BV6JR-3', 'BM7HPK-9'] //田褥單組或多組呼號
    const apiKey = '' //請填入APRS API Token
    const interval = 10 //抓取十分鐘內更新Aprs.fi的呼號
    const lineNotifyToken = '' //請填入Line Notify API Token

    for (const name of names) {
      // 設定 APRS.fi API 的 URL
      const apiUrl = `https://api.aprs.fi/api/get?name=${name}&what=loc&apikey=${apiKey}&format=json`

      // 發送 API 請求
      const response = await fetch(apiUrl)
      const data = await response.json()

      // 檢查是否找到呼號
      if (data.found === 0) {
        console.log(`呼號 ${name} 找不到`)
        continue
      }

      // 取得位置資訊
      const location = data.entries[0]
      const { lat, lng, altitude } = location

      // 檢查最後更新時間是否在指定的時間範圍內
      const lastTime = new Date(location.lasttime * 1000)
      const currentTime = new Date()
      const diffMinutes = Math.round((currentTime - lastTime) / (1000 * 60))
      if (diffMinutes > interval) {
        console.log(`呼號 ${name} 最後更新於 ${lastTime}，超過 ${interval} 分鐘未更新`)
        continue
      }

      // 建立 Google Map 連結
      const mapUrl = `https://maps.google.com/?q=${lat},${lng}`

      // 建立 Line Notify 訊息
      const lineMessage = `呼號: ${name}\nAPRS詳細資訊: https://aprs.fi/info/a/${name}\n備註: ${location.comment}\n位置: ${location.lat}, ${location.lng}\n高度: ${location.altitude}公尺 \n地圖: ${mapUrl}`

      // 發送 Line Notify 訊息
      const lineResponse = await fetch('https://notify-api.line.me/api/notify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Bearer ${lineNotifyToken}`
        },
        body: new URLSearchParams({
          message: lineMessage
        })
      })

      // 檢查 Line Notify 的回應狀態碼
      if (lineResponse.status === 200) {
        console.log(`已成功傳送 Line Notify 訊息給 ${name}`)
      } else {
        console.log(`傳送 Line Notify 訊息給 ${name} 失敗，狀態碼: ${lineResponse.status}`)
      }
    }
  } catch (error) {
    console.error(error)
  }
}
