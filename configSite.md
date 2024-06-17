## 📌 Logo and Name WebSite

Data Prepared:

- Logo Url: upload on Google drive, CDN... (format svg, png, jpeg) [A-TODO]
  Example: https://storage.googleapis.com/tc-cdn-prod/nbc/icons/iron-bank-logo.svg

- Chain Name: string [B-TODO]
  Example: Iron Chain Bank, Crypto Wars, .... (L3 chain)

## Files must be edited

[1]. index.html

- Line 8: "Block Explorer provides all the information to deep dive into transactions, blocks, contracts, and much more. Deep dive into [A-TODO] and explore the network."

- Line 16: <meta
      property="og:image"
      content="[B-TODO]"
    />
- <link
      rel="alternate icon"
      type="image/x-icon"
      href="[B-TODO]"
    />

- <link
      rel="icon"
      type="image/svg+xml"
      href="[B-TODO]"
    />

[2]. packages/app/src/components/header/TheHeader.vue
<img
        src="[B-TODO]"
        alt=""
        class="w-auto h-[60px]"
    />

[3]. packages/app/src/locales/en.json
{
"general": {
"l2NetworkName": "[A-100]",
"l1NetworkName": "Supersonic"
},

...

"networkStats": {
"subtitleMainnet": "[A-100] Mainnet is open to everyone.",
},

...
"blockExplorer": {
"title": "[A-100] Block Explorer",
"subtitle": "[A-100] Block Explorer provides all the information to deep dive into transactions, blocks, contracts, and much more. Deep dive into [A-100] and explore the network.",
},

...
"contractVerification": {
"subtitle": "Source code verification provides transparency for users interacting with smart contracts. By uploading the source code, [A-100] Explorer will match the compiled code with that on the blockchain.",
}

...
"document": {
"title": "[A-100] Block Explorer",
},
}

[4]. packages/app/src/locales/uk.json
{
"general": {
"l2NetworkName": "[A-100]",
"l1NetworkName": "Supersonic"
},

...

"networkStats": {
"subtitleMainnet": "[A-100] Mainnet is open to everyone.",
},

...
"blockExplorer": {
"title": "[A-100] Block Explorer",
"subtitle": "[A-100] Block Explorer provides all the information to deep dive into transactions, blocks, contracts, and much more. Deep dive into [A-100] and explore the network.",
},
}
