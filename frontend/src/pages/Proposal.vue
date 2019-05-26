<template>
  <div class="proposal">
    <div class="left">
      <img src="@/assets/koa-project.png">
      <div class="title">
        Kao-kon-la-kao
      </div>
      <div class="desc">
        Public donations continued to pour in for Toon Bodyslam’s charity run although he had completed his 2,191-km run in the northernmost district of Mae Sai district of Chiang Rai Monday evening (Dec 25) to a warm welcome by his admirers.
      </div>
      <div class="full cs-pointer">
        <img src="@/assets/mock-content-detail.png">
      </div>
    </div>
    <div class="right">
      <div class="full donate">
        <div class="fund">
          <span class="backed">
            ${{ backedAmount | numberWithComma(2) }}
          </span>
          <span class="of">
            of
          </span>
          <span class="goal">
            ${{ goal | numberWithComma(2) }}
          </span>
        </div>
        <div class="full bar">
          <VueSlideBar
            v-model="backedAmount"
            :max="goal"
            :processStyle="{ backgroundColor: '#43a047' }"
            :showTooltip="false"
            :isDisabled="true"
            :lineHeight="15"
            :paddingless="true"
          />
          <div class="day-left">
            {{ timeLeft }} days left
          </div>
        </div>
        <div class="full amount">
          Raised by {{ numberOfSponsors }} people in 29 months
        </div>
        <div class="full donate-btn" @click="isOpenDonateModal = true">
          Donate now
        </div>
      </div>
      <div class="full cs-pointer">
        <img class="w-100pct" src="@/assets/mockup-creator-profile.png">
      </div>
      <div class="full">
        <div
          v-for="sponsor in sponsors"
          :key="sponsor.user"
          class="full"
        >
          <DonateItem
            :address=sponsor.user
            :amount=sponsor.amount
          />
        </div>
      </div>
    </div>
    <b-modal :active.sync="isOpenDonateModal">
      <DonateModal/>
    </b-modal>
  </div>
</template>

<script>
import VueSlideBar from 'vue-slide-bar'
import DonateItem from '@/components/DonateItem'
import { getProposalAmount, getSponsorAmountByProposalId, getSponsorByProposalId } from '@/services/katinrun.js'

import KTR_ABI from '@/constants/katinrun.json'
import { KATINRUN_ADDRESS } from '@/constants/index'
import bn from '@/utils/bn'
import moment from 'moment'
import DonateModal from '@/components/DonateModal'

export default {
  name: 'Proposal',
  components: {
    VueSlideBar,
    DonateItem,
    DonateModal
  },
  data () {
    return {
      pid: '',
      goal: 100,
      backedAmount: 50,
      katinrun: null,
      proposal: {},
      timeLeft: 0,
      isOpenDonateModal: false,
      numberOfSponsors: 100,
      sponsors: []
    }
  },
  // async created () {
  //   this.loadProposalCount()
  // },
  async mounted () {
    this.katinrun = await new this.$web3.eth.Contract(KTR_ABI, KATINRUN_ADDRESS)
    await this.getPoppularProject()
    await this.getRecentDonators()
    setInterval(async () => {
      await this.getPoppularProject()

      await this.getRecentDonators()
    }, 1000)
  },
  methods: {
    async loadProposalCount () {
      await getProposalAmount()
    },

    async getPoppularProject () {
      this.proposal = await this.katinrun.methods.getProposal(1).call()
      this.timeLeft = moment.unix(this.proposal.dueDate).diff(moment(), 'days')
      this.goal = bn(this.proposal.goal).toBase().toNumber()
      this.backedAmount = bn(this.proposal.backedAmount).toBase().toNumber()
      this.numberOfSponsors = bn(await getSponsorAmountByProposalId(1)).toNumber()
    },

    async getRecentDonators () {
      let sponsorCount = await await getSponsorAmountByProposalId(1)
      const demos = ['0xFceE22fcC5607812DB42371D9F75CF527e44718a', '0x786F95663B1fEAa429FE608dd51946356f9e6D54', '0x950807aeaCCb5E66DC09e9F99A7d559A880D8b14']


      let sponsors = []
      sponsorCount = 3
      for(var i=0; i < sponsorCount; i++) {
        // console.log(`i ${i}`)
        // let sponsor = await getSponsorByProposalId(1, i)
        // console.log(`sponsor ${sponsor}`)


        sponsors.push({
          user: demos[i],
          amount: 1200
        })
      }

      this.sponsors = sponsors
    }
  }
}
</script>

<style lang="scss" scoped>
.full {
  float: left;
  width: 100%;
}
.cs-pointer {
  cursor: pointer;
}
.w-100pct {
  width: 100%;
}
.proposal {
  float: left;
  width: 100%;
  padding: 40px 7%;

  .left {
    float: left;
    width: 60%;
    margin-right: 35px;

    img {
      width: 100%;
    }

    .title {
      margin-top: 35px;
      font-size: 32px;
      font-weight: 900;
      color: #4c4c4c;
    }

    .desc {
      margin-top: 45px;
      font-weight: 500;
      color: #4c4c4c;
    }
  }

  .right {
    float: left;
    width: calc(40% - 35px);
  }
}
.donate {
  box-shadow: 0 0 6px -2px rgba(0, 0, 0, 0.5);
  background-color: #ffffff;
  padding: 22px 14px;
  margin-bottom: 30px;

  .fund {
    float: left;
    width: 100%;
    text-align: center;

    .backed {
      font-size: 25px;
      font-weight: 900;
      color: #4c4c4c;
    }

    .of {
      font-size: 19px;
      color: #4c4c4c;
    }

    .goal {
      font-size: 25px;
      color: #4c4c4c;
    }
  }
}
.bar {
  margin-top: 14px;
  .day-left {
    margin-top: 10px;
    text-align: right;
    font-size: 15px;
    color: #7e7e7e;
  }
}
.amount {
  float: left;
  width: 100%;
  margin: 30px 0 20px 0;
  text-align: center;
}
.donate-btn {
  padding: 15px;
  font-size: 20px;
  text-align: center;
  font-weight: bold;
  background-color: #2193FF;
  color: #fff;
  border-radius: 3px;
  cursor: pointer;
}
</style>

