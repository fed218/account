<template>
  <div class="container p-0">

    <loading :active.sync="isLoading" :is-full-page="true">
      <template slot="default">
        <img src="@/assets/loading-logo.png" class="w-50">
      </template>
      <template slot="after">
        <img src="@/assets/loading.svg">
      </template>
    </loading>

    <section class="d-flex justify-content-between bg-dark text-light px-3 py-3">
      <div>
        <a href="#" class="text-light" @click.prevent="isShow = !isShow" v-if="!isShow">
          <i class="fas fa-chart-bar fa-3x"></i>
        </a>
        <a href="#" class="text-primary" @click.prevent="isShow = !isShow" v-else>
          <i class="fas fa-chart-bar fa-3x"></i>
        </a>
      </div>
      <div class="pt-1">
        <form class="form-inline">
          <div class="form-group">
            <input type="date" class="form-control" v-model="tempIncome.time" @change="chars">
          </div>
        </form>
      </div>
      <div>
        <a href="#" class="text-light" @click.prevent="openModal(true)">
          <i class="fas fa-plus fa-3x"></i>
        </a>
      </div>
    </section>
    <section class="bg-secondary text-dark p-4 main">
      <div class="row justify-content-center mb-4">
        <div class="col-md-8 col-12">
          <p class="h1 font-weight-bold d-flex">
            <span class="mr-auto">TWD</span>
            <span v-if="filterTotal.length < 1">0</span>
            <span v-for="item in filterTotal" :key="item.money">{{item.money | currency}}</span>
          </p>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-md-8 col-12">
          <div>
            <table class="table text-dark">
              <tbody>
                <tr v-for="item in filterArray" :key="item.id">
                  <td class="text-center border-dark pt-3">{{item.description}}</td>
                  <td class="text-right border-dark pt-3">{{item.money | currency}}</td>
                  <td class="text-right border-dark">
                    <a href="#" class="text-dark mr-4" @click.prevent="openModal(false, item)">
                      <i class="fas fa-list-ul"></i>
                    </a>
                    <a
                      href="#"
                      class="text-dark btn pt-0"
                      @click.prevent="delItem(item.id)"
                      :class="{'disabled': itemLoading === item.id}"
                    >
                      <i class="far fa-trash-alt" v-if="itemLoading !== item.id"></i>
                      <i class="fas fa-spinner fa-pulse" v-else></i>
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="mt-5" v-if="isShow">
            <ve-pie :data="chartData"></ve-pie>
          </div>
        </div>
      </div>
    </section>
    <section class="p-3 bg-dark text-center">
      <div class="row">
        <div class="col-6">
          <a href="#" class="text-light h2 font-weight-bold" @click.prevent="goPath('/')">支出</a>
        </div>
        <div class="col-6">
          <a href="#" class="text-primary h2 font-weight-bold"
          @click.prevent="goPath('/income')">收入</a>
        </div>
      </div>
    </section>

    <!-- Modal -->
    <div
      class="modal fade"
      id="accountModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="d-flex justify-content-between bg-dark text-light">
            <div>
              <a href="#" class="text-light btn" data-dismiss="modal">
                <i class="fas fa-chevron-circle-left fa-2x"></i>
              </a>
            </div>
            <div class="pt-1">
              <p class="h3" v-if="isNew">新增收入</p>
              <p class="h3" v-else>編輯收入</p>
            </div>
            <div>
              <a
                href="#"
                class="text-light btn"
                @click.prevent="updataExpend"
                :class="{'disabled': clickLoading}"
              >
                <i class="far fa-check-circle fa-2x" v-if="!clickLoading"></i>
                <i class="fas fa-spinner fa-pulse fa-2x" v-else></i>
              </a>
            </div>
          </div>
          <div class="modal-body p-0">
            <section class="bg-secondary text-dark pt-2">
              <div class="row align-items-center main-edit">
                <div class="col-3 text-center p-3">
                  <a
                    href="#"
                    class="text-dark"
                    v-if="tempIncome.category !== '薪水'"
                    @click.prevent="changeValue('薪水')"
                  >
                    <i class="fas fa-dollar-sign fa-2x"></i>
                    <span class="d-block">薪水</span>
                  </a>
                  <a
                    href="#"
                    class="text-primary"
                    v-if="tempIncome.category === '薪水'"
                    @click.prevent="changeValue('薪水')"
                  >
                    <i class="fas fa-dollar-sign fa-2x"></i>
                    <span class="d-block">薪水</span>
                  </a>
                </div>
                <div class="col-3 text-center p-3">
                  <a
                    href="#"
                    class="text-dark"
                    v-if="tempIncome.category !== '獎金'"
                    @click.prevent="changeValue('獎金')"
                  >
                    <i class="far fa-money-bill-alt fa-2x"></i>
                    <span class="d-block">獎金</span>
                  </a>
                  <a
                    href="#"
                    class="text-primary"
                    v-if="tempIncome.category === '獎金'"
                    @click.prevent="changeValue('獎金')"
                  >
                    <i class="far fa-money-bill-alt fa-2x"></i>
                    <span class="d-block">獎金</span>
                  </a>
                </div>
                <div class="col-3 text-center p-3">
                  <a
                    href="#"
                    class="text-dark"
                    v-if="tempIncome.category !== '投資'"
                    @click.prevent="changeValue('投資')"
                  >
                    <i class="fas fa-chart-line fa-2x"></i>
                    <span class="d-block">投資</span>
                  </a>
                  <a
                    href="#"
                    class="text-primary"
                    v-if="tempIncome.category === '投資'"
                    @click.prevent="changeValue('投資')"
                  >
                    <i class="fas fa-chart-line fa-2x"></i>
                    <span class="d-block">投資</span>
                  </a>
                </div>
                <div class="col-3 text-center p-3">
                  <a
                    href="#"
                    class="text-dark"
                    v-if="tempIncome.category !== '其他'"
                    @click.prevent="changeValue('其他')"
                  >
                    <i class="fas fa-paperclip fa-2x"></i>
                    <span class="d-block">其他</span>
                  </a>
                  <a
                    href="#"
                    class="text-primary"
                    v-if="tempIncome.category === '其他'"
                    @click.prevent="changeValue('其他')"
                  >
                    <i class="fas fa-paperclip fa-2x"></i>
                    <span class="d-block">其他</span>
                  </a>
                </div>
              </div>
            </section>
            <section class="p-3 bg-dark">
              <div class="mb-4">
                <label for="price" class="text-light h4 mb-3">金額：</label>
                <form class="form-inline">
                  <div class="form-group">
                    <input
                      type="number"
                      class="form-control"
                      v-model="tempIncome.money"
                      id="price"
                      placeholder="請輸入金額"
                    >
                  </div>
                </form>
              </div>
              <form>
                <div class="form-group">
                  <label for="description" class="text-light h4 mb-3">描述：</label>
                  <textarea
                    name="description"
                    id="description"
                    class="form-control"
                    cols="30"
                    rows="3"
                    placeholder="請填寫內容描述"
                    v-model="tempIncome.description"
                  ></textarea>
                </div>
              </form>
            </section>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';

export default {
  data() {
    return {
      data: [],
      total: [],
      tempIncome: {
        time: '',
        category: '',
        description: '',
        money: '',
      },
      chartData: {
        columns: ['category', 'money'],
        rows: [],
      },
      itemLoading: '',
      isNew: false,
      isShow: false,
      isLoading: false,
      clickLoading: false,
    };
  },
  methods: {
    getToday() {
      const vm = this;
      const timestamp = Date.now();
      const date = new Date(timestamp);
      if (date.getMonth() <= 8) {
        if (date.getDate() <= 9) {
          vm.tempIncome.time = `${date.getFullYear()}-0${date.getMonth() + 1}-0${date.getDate()}`;
        } else {
          vm.tempIncome.time = `${date.getFullYear()}-0${date.getMonth() + 1}-${date.getDate()}`;
        }
      } else if (date.getDate() <= 9) {
        vm.tempIncome.time = `${date.getFullYear()}-${date.getMonth() + 1}-0${date.getDate()}`;
      } else {
        vm.tempIncome.time = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
      }
    },
    getData() {
      const api = `${process.env.VUE_APP_APIPATH}/income`;
      const vm = this;
      const time = [];
      vm.isLoading = true;
      vm.total = [];
      this.$http.get(api).then((response) => {
        vm.isLoading = false;
        vm.data = response.data;
        vm.data.forEach((item) => {
          if (time.indexOf(item.time) === -1) {
            time.push(item.time);
          }
        });
        let tempItem = {};
        for (let i = 0; i < time.length; i += 1) {
          tempItem = {
            time: time[i],
            money: 0,
          };
          vm.total.push(tempItem);
        }
        vm.data.forEach((item) => {
          for (let i = 0; i < time.length; i += 1) {
            if (vm.total[i].time === item.time) {
              vm.total[i].money += Number(item.money);
            }
          }
        });
        vm.chars();
      });
    },
    openModal(New, item) {
      if (New) {
        this.tempIncome.category = '';
        this.tempIncome.description = '';
        this.tempIncome.money = '';
        this.tempIncome.id = '';
        this.isNew = true;
      } else {
        this.tempIncome = Object.assign({}, item);
        this.isNew = false;
      }
      $('#accountModal').modal('show');
    },
    changeValue(i) {
      this.tempIncome.category = i;
    },
    updataExpend() {
      let api = `${process.env.VUE_APP_APIPATH}/income`;
      let httpMethods = 'post';
      const vm = this;
      if (!vm.isNew) {
        api = `${process.env.VUE_APP_APIPATH}/income/${vm.tempIncome.id}`;
        httpMethods = 'put';
      }
      if (vm.tempIncome.category === '' || vm.tempIncome.money === '' || vm.tempIncome.money === '0' || vm.tempIncome.description === '') {
        const message = '資料輸入有誤、不齊全，請再確認一次';
        const status = 'danger';
        vm.$store.dispatch('messagePush', { message, status });
      } else {
        vm.clickLoading = true;
        this.$http[httpMethods](api, vm.tempIncome).then(() => {
          vm.clickLoading = false;
          $('#accountModal').modal('hide');
          vm.getData();
        });
      }
    },
    delItem(i) {
      const api = `${process.env.VUE_APP_APIPATH}/income/${i}`;
      const vm = this;
      vm.itemLoading = i;
      this.$http.delete(api).then(() => {
        vm.itemLoading = '';
        vm.getData();
      });
    },
    goPath(i) {
      this.$router.push(i);
    },
    chars() {
      const api = `${process.env.VUE_APP_APIPATH}/income`;
      const vm = this;
      const categorys = [];
      vm.chartData.rows = [];

      this.$http.get(api).then((response) => {
        const datas = response.data.filter(item => item.time === vm.tempIncome.time);
        datas.forEach((item) => {
          if (categorys.indexOf(item.category) === -1) {
            categorys.push(item.category);
          }
        });
        let tempItem = {};
        for (let i = 0; i < categorys.length; i += 1) {
          tempItem = {
            category: categorys[i],
            money: 0,
          };
          vm.chartData.rows.push(tempItem);
        }
        datas.forEach((item) => {
          for (let i = 0; i < categorys.length; i += 1) {
            if (vm.chartData.rows[i].category === item.category) {
              vm.chartData.rows[i].money += Number(item.money);
            }
          }
        });
      });
    },
  },
  computed: {
    filterArray() {
      const vm = this;
      return vm.data.filter(item => item.time.match(vm.tempIncome.time));
    },
    filterTotal() {
      const vm = this;
      return vm.total.filter(item => item.time.match(vm.tempIncome.time));
    },
  },
  created() {
    this.getToday();
    this.getData();
  },
};
</script>
