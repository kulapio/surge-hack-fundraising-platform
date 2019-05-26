<template>
  <div class="proposal">
    <div class="left">
      <img src="@/assets/koa-project.png">
      <div class="title">
        Title
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
            $1,335,000
          </span>
          <span class="of">
            of
          </span>
          <span class="goal">
            $2,670,000
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
            36 days left
          </div>
        </div>
        <div class="full amount">
          Raised by 115,870 people in 29 months
        </div>
        <div class="full donate-btn">
          Donate now
        </div>
      </div>
      <div class="full cs-pointer">
        <img class="w-100pct" src="@/assets/mockup-creator-profile.png">
      </div>
      <div class="full">
        <div
          v-for="i in 8"
          :key="i"
          class="full"
        >
          <DonateItem
            address="0x28361D7c04C1D0cdB2580B7776F31C04a38a5FBE"
            :amount="1200"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueSlideBar from 'vue-slide-bar'
import DonateItem from '@/components/DonateItem'

export default {
  name: 'Proposal',
  components: {
    VueSlideBar,
    DonateItem
  },
  data () {
    return {
      pid: '',
      goal: 100,
      backedAmount: 50,
      katinrun: null,
      proposal: {},
      timeLeft: 0
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

