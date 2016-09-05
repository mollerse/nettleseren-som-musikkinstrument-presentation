import createTheme from "spectacle/lib/themes/default";

export default createTheme({
  primary: "linear-gradient(135deg, rgba(10,3,13,0.9) 0%, rgba(10,3,13,0.9) 25%, rgba(71,0,82,0.9) 50%, rgba(10,3,13,0.9) 75%, rgba(10,3,13,0.9) 100%), url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAABaCAYAAAA/xl1SAAAgAElEQVR4XrWdBbR3RdXG59rd3d3dgWJgd3eLit2CHYAoImJgKwaK3diNhS0mKraIYreo91u/s77nrufuu/fM/O/7fWctlr73P+ecOTM7nx2ztr6+vv7BD36w3eAGN2hcz33uc9sjH/nI5f9z/fa3v22nP/3pN/49+j+vetWr2r3vfe/RsPL3f//73+0EJzhB9/7Pfvaz7XKXu1w7yUlOsjHuFa94Rbvvfe/b3vWud7Vb3OIWG3/fa6+92olPfOL26Ec/On3mr3/963amM52pfN+f/vSndtKTnrSd8IQn3BjzoQ99qF3/+tcffuM73vGOdqtb3Sod99KXvrTd//73bzz/9a9/fXvgAx/YtHbvfOc72y1vecvu8w844ID2sIc9LB3z3ve+t930pjdt3/nOd9q//vWvdulLX3pj3H/+8592/OMffzj3OGDfffdtj3nMY5Y//+IXv2gf+MAH2n3uc58W94vvec1rXtMe8pCHbDxC88leugYB+g9/+MMf2mlOc5rG4v3whz8sN073fOITn2g/+MEP2pWudKV2qUtdavnzN7/5zXaJS1xi5Y+MN/D+85///Bt/ft7zntce/vCHp899wxvesBDk3/72t3bXu9510xg24UQnOtGmv8VN5juuda1rdedcMePzn//8dr/73a8dcsgh7Z73vGf6jEgwb3nLW9rtbne7qTXK5u83fvGLX2xXvOIVtzzrta99bfvd736XrhlEwn79/e9/X+672tWuVs7lla985UJsIr4vfOEL7da3vvXU3EeDthDg6IZvfOMb7ZznPGc77WlPu2Xohz/84Xbta197iwR7z3ve0252s5uVj84kys9+9rPlPfE6+uij21nPetbRNDf9/q1vfatd/OIX3/jbPvvssyzghS50ocacr3e966XPE8EfccQR7ZKXvORK79Tgz3zmM+3qV796+9rXvrYwyEUucpH2pS99qR177LHtDGc4Q7vCFa6wDP3ud7+7/KYLJn7/+9+/ME4l6TQ2W1/97eMf/3i76EUv2s5ylrNsmf+b3vSmdoc73GGRZmiCu9/97s0lnd+QSdwXvvCF7cEPfnC6Lu973/vaTW5yky2/ffnLX26Xv/zlN/4+TYD7779/e8QjHjHchEMPPbTd+MY3Xsa99a1vXVTAne985/bTn/60netc59p0fzVJBrH4N7rRjZbxbiL0VE9vcqiGU53qVMuQv/71r40NuuMd75jegqSD6EYSMRK2PywS7ec///l2latcZWMI0pKrmoNUdO+b/vznP7dTnvKUG0Ne8IIXbFJ92b1a84rQdM9IVWMGIXnFHL/61a82iNwlps8ByYlZ4FpiIcD4sU94whMatlN2Pf7xj29777338hPSUGr33e9+d7v5zW++/D2TaB/72Mfada5znY1HoipPdrKTbXoFqvwCF7jAShzFYGwnOBwp4vbrH//4x3bqU5+63MOo0pE6n/vc59quu+66cY++MX6TS84Xv/jFbbfddmuf/OQnF4m65557pu+MUs6l/Ec/+tF23eted9N9hx12WNtpp502/vac5zxnMYnYG/YI5oaQkVxcn/70p9s1rnGNJnu4R7z89t///rcd73jH2zIMBj35yU++5e/f//73F5sPqYrNGq/f//73mzQjz4cu3J5lrXbeeed2sYtdrP34xz9uCwFKrbEgvOC85z1ve/vb376h51166KWf+tSn2jWvec3F4LzHPe7Rvve977ULX/jCo29eJo+a1gVH4lD01CoffsELXjB9tmxWPuY85zlP+f6vfOUry3t0vehFL2oPetCDyvE96aybjjzyyEWN+8Ua8o0Qxbe//e1lobme+cxntj322GO4PtmAN77xje1Od7pTeu/BBx/c7nKXu2z8Jqb66le/2i572csuf4fw2Rs2PyOc3qS0r739zQQWav2GN7zhlnlFol875phj1qMX6JwZCcYnGz+e36JxjapjIu5FMu7rX//6Ju/soIMOWkTzy1/+8k0SCA8Rqejqi/tRaTg6pzjFKbas36wEyBZeUobfkIZXvepVl2Ef+chH2i677LLpFt6D1Gf9nvGMZ7QnPelJm36PUp8ff/KTn7Rzn/vcm8aJwVwt4lRhuvil5yH1pLpf8pKXtAc84AGtx6TxOyNx4NWe/exn37IcaClMiStf+cpdxnFNyECfy4EHHtgl+i02YGbQymBm8dD9eE7YCFJV0et92ctetniF/nckJZIv2oFMmA9dW1tb4A4uDPbLXOYy5Ufzfo0Vx//lL39pGNXy1nQzm4Vxr+e97W1vW4xjQTi6H4n+y1/+srTJ9Dz3nn/0ox8t2mJ0HX744QtK4KaOpCf2ErBI5j27WaN3vO51r2t3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)",
  secondary: "white",
  tertiary: "#00fff2"
}, {
  primary: "Jaapokki-regular"
});
