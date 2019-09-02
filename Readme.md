# CRLife Daily Bible Study
A prototype applicaiton designed to show content from a daily devotional reading intermixed with associated bible readings.

The applicaiton leverages New Life Translation bible content (NLT) via Tyndale House Publishers online API service [NLT.TO API](http://api.nlt.to)

Daily devotional content is provided though Crossroads Church, Woodbury MN.  [crossroadschurch.cc](http://www.crossroadschurch.cc/)


## Applicaiton Components
**Server**: Express/Node.js

**Client**: React/Webpack

## Deployments
Current application is hosted in Microsoft Azure: 
https://crlife-daily.azurewebsites.net/

Application leverages [Azure App Services](https://azure.microsoft.com/en-us/services/app-service/), and [Azure Blob Storage](https://azure.microsoft.com/en-us/services/storage/blobs/)

## Local Development

Install and build the client application first

```
.\> cd client
.\client> npm install
.\client> npm run build
```

This will create a packed version of the client

Next, install and build the server application.
```
.\client> cd ..
.\> npm install
.\> npm run build
```

Finally, copy the packed version of the client into the server 'public bucket'
```
.\> npm run packclient
```

When complete, you should have a build version of the **server** at `.\dist\`

```
    Directory: C:\Users\ben\Projects\crlife-dailybibleverse\dist


Mode                LastWriteTime         Length Name
----                -------------         ------ ----
d-----         9/2/2019  11:01 AM                config
d-----         9/2/2019  11:01 AM                descriptors
d-----         9/2/2019  11:01 AM                helpers
d-----         9/2/2019  11:01 AM                modules
d-----         9/2/2019  11:01 AM                services
-a----         9/2/2019  12:25 PM           1283 logger.js
-a----         9/2/2019  12:25 PM            851 logger.js.map
-a----         9/2/2019  12:25 PM           1914 main.js
-a----         9/2/2019  12:25 PM           1792 main.js.map
```

And a packed version of the **client** at `.\public\`
```
    Directory: C:\Users\ben\Projects\crlife-dailybibleverse\public

Mode                LastWriteTime         Length Name
----                -------------         ------ ----
d-----         9/2/2019  10:55 AM                dist
-a----         9/2/2019  10:30 AM           2189 favicon.png
-a----         9/2/2019  10:30 AM            822 index.html


    Directory: C:\Users\ben\Projects\crlife-dailybibleverse\public\dist


Mode                LastWriteTime         Length Name
----                -------------         ------ ----
-a----         9/2/2019  10:55 AM        1078353 bundle.js
-a----         9/2/2019  10:55 AM        1005323 bundle.js.map
```

## Running the local server

Start the dev version of the server
```
.\> npm run dev
```

Open a browser to http://localhost:3000