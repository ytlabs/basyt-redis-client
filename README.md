# basyt-redis-client

basyt-redis-client, node redis modülünü kullanan basit bir messaging queue client implementasyonudur.

## API

### createClient()

Message Queue için istemci yaratır. Aşağıda İstemcinin sunduğu metodlar verilmiştir:

#### subscribe(channel)

`channel` isimli kanalda yayınlanan paketleri almak için istemciyi kanala üye yapar.

#### psubscribe(channel)

`channel` patternine sahip tüm kanallarda yayınlanan paketleri almak için istemciyi patterne uyan tüm kanallara üye yapar.

#### publish(channel, obj)

`channel` isimli kanalda `obj` verisini içeren paket yayınlar. Bir kanalda yayın yapmak için kanala üye olmaya gerek YOKTUR.

#### onMessage(callback)

istemcinin üye olduğu kanallarda herhangi bir paket yayınlandığında geldiğinde `callback` fonsiyonunu çağırtır. Fonksiyonun ilk argümanı kanal ismi, ikincisi yayınlanan pakettir.

#### unsubscribe(channel)

`channel` isimli kanalın üyeliğinden çıkarır.

#### push(queue, data)

`queue` isimli kuyruğa içeriği `data` olan yeni bir paket ekler

#### onQueue(queue, callback)

`queue` isimli kuyrukta paket geldiğinde `callback` fonksiyonunu paket içeriği argüman olacak şekilde çağırır.

#### onceQueue(queue, callback)

`queue` isimli kuyrukta paket geldiğinde `callback` fonksiyonunu paket içeriği argüman olacak şekilde çağırır. Tek seferliktir. Her callback'ten sonra tekrarlanmalıdır.

#### getPubSubClient()

publish/subscribe için kullanılan redis istemci objesini sunar

#### getQueueingClient()

Kuyruk için kullanılan redis istemci objesini sunar

#### quit()

İstemciyi imha eder.
