const queryDynamic = {};

queryDynamic.load = function() {
  new Vue({
    el: '#queryDynamic',
    data() {
      return {
        /*
          data中定义vue实例中将要用到的参数
          一般只定义不赋值，赋值在created中进行
        */
        selectedQueryType: '0',
        // 为1表示按航班号查询，否则则是按行程查询
        queryTypeOpions: [
          {text: '按行程查询',value: '0'},
          {text: '按航班查询',value: '1'}
        ],

        departureCity: {text: '',value: ''},
        arrivalCity: {text: '',value: ''},
        flightNum: '',// 航班号
        departureDate: '',

        isError: false,
        errorInfo: ''
      };
    },
    methods: {
      handleSelectDepartureDate: function() {
        let _this = this;
        setTimeout(()=> {
          const selectedDate = _this.$refs.departDateInput.value;
          _this.departureDate = selectedDate;
        },500);
      },
      handleChangeDepartureCity: function() {
        let _this = this;
        setTimeout(()=> {
          const currentDepartureCityElement = _this.$refs.departureCityInput;
          _this.departureCity.text = currentDepartureCityElement.value;
          _this.departureCity.value = currentDepartureCityElement.value === '' ? '' : currentDepartureCityElement.dataset.citycode;
        },500);
      },
      handleChangeArriveCity: function() {
        let _this = this;
        setTimeout(()=> {
          const currentArriveCityElement = _this.$refs.arriveCityInput;
          _this.arrivalCity.text = currentArriveCityElement.value;
          _this.arrivalCity.value = currentArriveCityElement.value === '' ? '' : currentArriveCityElement.dataset.citycode;
        },500);
      },
      vaidateInfo: function() {
        const {selectedQueryTyp,departureDate} = this;
        // 是否按航班号查询
        const isFlightNum = selectedQueryTyp === '1';
        // 匹配只有大小写字母
        const matchCase = /^[A-Za-z]+$/;
        if (isFlightNum) {
          const {flightNum} = this;
          if (flightNum.length > 0) {
            // 匹配只有大小写字母和数字字符
            const matchCaseAndNumber = /^[A-Za-z0-9]+$/;
            // 匹配只有数字字符
            const matchNumber = /^[0-9]*$/;
            // 截取航班号二字码
            const towCharacterCode = flightNum.substring(0, 2);
            // 截取航班号
            const interceptedFlightNo = flightNum.substring(2, 4);

            // 判断航班号是否符合规范
            if (flightNo.length === 6 && matchCaseAndNumber.test(flightNo) && matchCase.test(towCharacterCode) && matchNumber.test(interceptedFlightNo)) {
              if (departureDate.length !== 0) {
                // 提交入参表单
                // submitFlightSearch();
                this.isError = false;
                return true;
              } else {
                this.isError = true;
                this.errorInfo = '提交日期不能为空';
                console.warn('提交日期不能为空');
                return false;
              }

            }
            this.isError = true;
            this.errorInfo = '航班号不正确，请重新输入！';
            console.warn('航班号不正确，请重新输入！');
            return false;
          }
          this.isError = true;
          this.errorInfo = '航班号不能为空！';
          console.warn('航班号不能为空');
          return false;

        } else {
          // 按行程查询
          const departureCity = this.departureCity.value;
          const arrivalCity = this.arrivalCity.value;

          if (departureCity.length > 0) {
            if (matchCase.test(departureCity)) {
              if (arrivalCity.length > 0) {
                if (matchCase.test(arrivalCity)) {
                  if (departureDate.length > 0) {
                    // submitFlightSearch();
                    this.isError = false;
                    return true;
                  } else {
                    this.isError = true;
                    this.errorInfo = '出发日期不能为空！';
                    console.warn('出发日期不能为空');
                    return false;
                  }

                } else {
                  this.isError = true;
                  this.errorInfo = '到达城市只能为三字码！';
                  console.warn('到达城市只能为三字码');
                  return false;
                }

              } else {
                this.isError = true;
                this.errorInfo = '到达城市不能为空!';
                console.warn('到达城市不能为空');
                return false;
              }

            } else {
              this.isError = true;
              this.errorInfo = '出发城市只能为三字码！';
              console.warn('出发城市只能为三字码！');
              return false;
            }

          } else {
            this.isError = true;
            this.errorInfo = '出发城市不能为空！';
            console.log('出发城市不能为空');
            return false;
          }

        }
      },
      submitFlightSearch: function() {
        const {selectedQueryTyp,departureDate} = this;
        // 是否按航班号查询
        const isFlightNum = selectedQueryTyp === '1';
        // 判断flightType != 1为按行程查询
        if (isFlightNum) {
          const flightNum = this.flightNum.toUpperCase();
          const flightType = 'byFlightNumber';
          // resultObject.FlightStatus.processFlightStatusQuery.processFlightStatusQueryForm.FlightNumber.value = flightNo;
          // var	FtListone = {'flightDate': flightDate,'flightType': flightType,'flightNo': flightNo};

        } else {
          deptAirport = jq('#trpDepartureHBDT').attr('data-citycode');// 出发城市
          arrvAirport = jq('#trpArrivalHBDT').attr('data-citycode');// 到达城市
          flightType = 'byCityPair';
          // resultObject.FlightStatus.processFlightStatusQuery.processFlightStatusQueryForm.DepartureAirport.value = deptAirport;
          // resultObject.FlightStatus.processFlightStatusQuery.processFlightStatusQueryForm.ArrivalAirport.value = arrvAirport;
          // var	FtListone = {'flightDate': flightDate,'flightType': flightType,'deptAirport': deptAirport,'arrvAirport': arrvAirport};

        }

        // 其他参数填入相应位置
        // let action = resultObject.FlightStatus.processFlightStatusQuery.processFlightStatusQueryForm.action;
        // let data = {'url': 'http://' + serverUrl + '/ibe' + action,'data': resultObject.FlightStatus.processFlightStatusQuery.processFlightStatusQueryForm};
        // let dataObjReqOri = JSON.stringify(data);
        // jQuery.addLocalStorageItem(FLIGHT_DYNAMICS,JSON.stringify(resultObject));

      },
      queryFlightDynamic: function() {
        if (this.vaidateInfo()) {
          this.submitFlightSearch();
        }
      }


    },
    mounted: function() {
      setTimeout(()=> {
        if (this.$refs.departDateInput) {
          this.departureDate = this.$refs.departDateInput.value;
        }
      },500);

    }
  });
};
