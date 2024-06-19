## 📌 Logo and Name WebSite

Data Prepared:

- Logo Url: upload on Google drive, CDN... (format svg, png, jpeg) [A-TODO]
  Example: https://storage.googleapis.com/tc-cdn-prod/nbc/icons/iron-bank-logo.svg

- Chain Name: string [B-100]
  Example: Iron Chain Bank, Crypto Wars, .... (L3 chain)

## Files must be edited

[1]. packages/index.html

- Line 8: "Block Explorer provides all the information to deep dive into transactions, blocks, contracts, and much more. Deep dive into [B-100] and explore the network."

- Line 16: <meta
      property="og:image"
      content="[A-TODO]"
    />
- <link
      rel="alternate icon"
      type="image/x-icon"
      href="[A-TODO]"
    />

- <link
      rel="icon"
      type="image/svg+xml"
      href="[A-TODO]"
    />

[2]. packages/app/src/components/header/TheHeader.vue
<img
        src="[A-TODO]"
        alt=""
        class="w-auto h-[60px]"
    />

[3]. packages/app/src/locales/en.json
{
"general": {
"l2NetworkName": "[B-100]",
"l1NetworkName": "Supersonic"
},

...

"networkStats": {
"subtitleMainnet": "[B-100] Mainnet is open to everyone.",
},

...
"blockExplorer": {
"title": "[B-100] Block Explorer",
"subtitle": "[B-100] Block Explorer provides all the information to deep dive into transactions, blocks, contracts, and much more. Deep dive into [B-100] and explore the network.",
},

...
"contractVerification": {
"subtitle": "Source code verification provides transparency for users interacting with smart contracts. By uploading the source code, [B-100] Explorer will match the compiled code with that on the blockchain.",
}

...
"document": {
"title": "[B-100] Block Explorer",
},
}

[4]. packages/app/src/locales/uk.json
{
"general": {
"l2NetworkName": "[B-100]",
"l1NetworkName": "Supersonic"
},

...

"networkStats": {
"subtitleMainnet": "[B-100] Mainnet is open to everyone.",
},

...
"blockExplorer": {
"title": "[B-100] Block Explorer",
"subtitle": "[B-100] Block Explorer provides all the information to deep dive into transactions, blocks, contracts, and much more. Deep dive into [B-100] and explore the network.",
},
}
