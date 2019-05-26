<template>
  <div class="md">
    <div class="title full">
      Enter your donation
    </div>
    <div class="full">
      <b-field label="Select token">
        <b-dropdown class="dd">
          <div
            class="btn"
            slot="trigger"
          >
            <img :src="`/static/tokens/${tokenSelected.code.toLowerCase()}.svg`" width="32" height="32">
            <span class="code">
              {{ tokenSelected.code }}
            </span>
          </div>
          <b-dropdown-item
            v-for="t in tokens"
            :key="t.code"
            aria-role="listitem"
            @click="selectToken(t)"
          >
            <img class="img-to-list" :src="`/static/tokens/${t.code.toLowerCase()}.${t.code === 'MESG' ? 'png' : 'svg'}`" width="32" height="32">
            <span class="code">
              {{ t.code }}
            </span>
          </b-dropdown-item>
        </b-dropdown>
      </b-field>
    </div>
    <div class="full mg-t-30">
      <b-field label="Enter amount">
        <b-input
          v-model="amount"
          placeholder="Enter amount"
        />
      </b-field>
    </div>
    <div class="full mg-t-30">
      <img class="dai" src="/static/tokens/dai.svg">
      <span class="text">
        You donate in amount {{ daiVal }} DAI
      </span>
    </div>
    <div class="full button submit" @click="submit">
      Submit donate
    </div>
  </div>
</template>

<script>
import { donateWithToken } from '@/services/swap.js'
import ERC20ABI from '@/constants/ERC20ABI.json'
import bn from '@/utils/bn'

export default {
  name: 'DonateModal',
  data () {
    return {
      tokens: [
        {
          code: 'ETH',
          name: 'Ethereum'
        },
        {
          code: 'DAI',
          name: 'Dai',
          address: '0x6b002bf0489ab6a2473fd4d3e5c54780ae10c08b'
        },
        {
          code: 'MKR',
          name: 'Maker',
          address: '0x7ba7d315f575e6077ec7c26d04cd59011e2e7ba2'
        },
        {
          code: 'OMG',
          name: 'OmiseGo',
          address: '0x08336136c09f483036e854088143290ac12bdcb2'
        },
        {
          code: 'KNC',
          name: 'KyberNetwork',
          address: '0x9b79f24bf3da40072189664621907730abc57b29'
        },
        {
          code: 'SNT',
          name: 'Status',
          address: '0x2b4f12cddb0653f5a47ad61f242d9bf62625a04a'
        },
        {
          code: 'MESG',
          name: 'MESG',
          address: '0x7ccb8f73fa06ade42b38e401dd240612887cf682'
        }
      ],
      tokenSelected: {
        code: 'ETH',
        name: 'Ethereum'
      },
      amount: 0,
      daiVal: 0,
      pid: 0
    }
  },
  watch: {
    amount (val) {
      if (this.tokenSelected.code === 'ETH') {
        this.daiVal = val * 248.70
      } else if (this.tokenSelected.code === 'MKR') {
        this.daiVal = val * 682.80
      } else if (this.tokenSelected.code === 'OMG') {
        this.daiVal = val * 1.999
      } else if (this.tokenSelected.code === 'KNC') {
        this.daiVal = val * 0.282
      } else if (this.tokenSelected.code === 'SNT') {
        this.daiVal = val * 0.026
      } else if (this.tokenSelected.code === 'MESG') {
        this.daiVal = val * 0.032
      } else if (this.tokenSelected.code === 'DAI') {
        this.daiVal = val * 1
      }
    }
  },
  created () {
    this.pid = this.$route.params.id
  },
  methods: {
    selectToken (t) {
      this.tokenSelected = t
      if (this.tokenSelected.code === 'ETH') {
        this.daiVal = this.amount * 248.70
      } else if (this.tokenSelected.code === 'MKR') {
        this.daiVal = this.amount * 682.80
      } else if (this.tokenSelected.code === 'OMG') {
        this.daiVal = this.amount * 1.999
      } else if (this.tokenSelected.code === 'KNC') {
        this.daiVal = this.amount * 0.282
      } else if (this.tokenSelected.code === 'SNT') {
        this.daiVal = this.amount * 0.026
      } else if (this.tokenSelected.code === 'MESG') {
        this.daiVal = this.amount * 0.032
      } else if (this.tokenSelected.code === 'DAI') {
        this.daiVal = this.amount * 1
      }
    },
    async submit () {
      if (this.tokenSelected.code !== 'ETH') {
        const amount = bn(this.amount).baseInWei(18).toString()
        const erc20 = await new this.$web3.eth.Contract(ERC20ABI, this.tokenSelected.address)
        const dex = '0xf968219c1be33e1a7f506aad3bef9af6dc433909'
        const usrAddr = await this.$web3.eth.getAccounts()
        await erc20.methods.approve(dex, amount).send({ from: usrAddr[0] })
        .on('transactionHash', async () => {
          await donateWithToken(this.tokenSelected.address, amount, this.pid, usrAddr[0])
        })
      }
    }
  }
}
</script>

<style>
.dropdown-trigger {
  float: left;
  width: 100%;
}
</style>


<style lang="scss" scoped>
.mg-t-30 {
  margin-top: 30px
}
.full {
  float: left;
  width: 100%;
}
.md {
  border-radius: 3px;
  border: solid 1px #979797;
  background-color: #ffffff;
  padding: 40px;
  float: left;
  width: 100%;
  .title {
    font-size: 25px;
    font-weight: 900;
    text-align: center;
    color: #000000;
  }
}
.dd {
  width: 100%;
  float: left;

  .btn {
    width: 100%;
    float: left;
    text-align: left !important;
    background-color: white;
    color: #363636;
    cursor: pointer;
    border: 1px solid #dbdbdb;
    border-radius: 4px;
    padding: 7px;

    img {
      margin-right: 20px;
      line-height: 39px;
      vertical-align: middle;
    }

    .code {
      font-size: 19px;
      font-weight: bold;
      color: #000000;
      line-height: 39px;
      vertical-align: middle;
    }
  }
}
.img-to-list {
  vertical-align: middle;
  margin-right: 20px;
}
.dai {
  line-height: 42px;
  vertical-align: middle;
  margin-right: 10px;
}
.text {
  font-size: 22px;
  font-weight: 500;
  color: #000000;
  line-height: 42px;
  vertical-align: middle;
}
.submit {
  background-color: #069bf9 !important;
  color: #fff;
  margin-top: 20px;
  font-size: 21px;
  font-weight: bold;
}
</style>
