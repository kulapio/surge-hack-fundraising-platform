<template>
  <div class="pop">
    <div class="pop--title">
      Popular fundraising
      <div/>
    </div>
    <div class="pop--content">
      <div class="pop--content--half">
        <img src="@/assets/koa-project.jpg">
      </div>
      <div class="pop--content--half ctx">
        <div class="top">
          <div class="ctx--title">
            {{ proposal.name }}
          </div>
          <div>
            {{ proposal.descHash }}
          </div>
        </div>
        <div class="bottom">
          <div class="day-left">
            {{ timeLeft }} days left
          </div>
          <VueSlideBar
            v-model="backedAmount"
            :max="goal"
            :processStyle="{ backgroundColor: '#43a047' }"
            :showTooltip="false"
            :isDisabled="true"
            :lineHeight="15"
            :paddingless="true"
          />
          <div class="num">
            <span>${{ backedAmount | numberWithComma(2) }}</span> of ${{ goal | numberWithComma(2) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueSlideBar from 'vue-slide-bar'
import KTR_ABI from '@/constants/katinrun.json'
import { KATINRUN_ADDRESS } from '@/constants/index'
import bn from '@/utils/bn'
import moment from 'moment'

export default {
  name: 'Header',
  components: {
    VueSlideBar
  },
  data () {
    return {
      goal: 100,
      backedAmount: 0,
      katinrun: null,
      proposal: {},
      timeLeft: 0
    }
  },
  async mounted () {
    this.katinrun = await new this.$web3.eth.Contract(KTR_ABI, KATINRUN_ADDRESS)
    setInterval(async () => {
      await this.getPoppularProject()
    }, 1000)
  },
  methods: {
    async getPoppularProject () {
      this.proposal = await this.katinrun.methods.getProposal(1).call()
      this.timeLeft = moment.unix(this.proposal.dueDate).diff(moment(), 'days')
      this.goal = bn(this.proposal.goal).toBase().toNumber()
      this.backedAmount = bn(this.proposal.backedAmount).toBase().toNumber()
    }
  }
}
</script>

<style lang="scss" scoped>
.pop {
  float: left;
  width: 100%;
  padding: 44px 7%;

  &--title {
    font-size: 25px;
    font-weight: 900;

    div {
      width: 60px;
      height: 6px;
      background-color: #bd10e0;
      margin-top: 5px;
    }
  }

  &--content {
    float: left;
    width: 100%;
    margin-top: 35px;
    box-shadow: 0 0 6px -2px rgba(0, 0, 0, 0.5);
    background-color: #ffffff;

    &--half {
      float: left;
      width: 50%;

      img {
        float: left;
        width:100%;
        height:100%;
        object-fit: cover;
        cursor: pointer;
      }
    }
  }
}
.ctx {
  padding: 20px;
  color: #4c4c4c;
  font-size: 16px;

  .top {
    float: left;
    width: 100%;
  }

  .bottom {
    float: left;
    width: 100%;
    margin-top: 40px;
    .day-left {
      text-align: right;
      font-size: 15px;
      color: #7e7e7e;
    }
    .num {
      margin-top: 15px;
      font-size: 21px;
      text-align: right;
      color: #4c4c4c;

      span {
        font-size: 21px;
        font-weight: 900;
        color: #4c4c4c;
      }
    }
  }

  &--title {
    font-size: 27px;
    font-weight: 900;
    color: #4c4c4c;
    margin-bottom: 10px;
    cursor: pointer;
  }
  &--title:hover {
    text-decoration: underline;
  }
}
</style>
