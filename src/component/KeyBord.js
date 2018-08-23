import React  ,{Component} from 'react';
import PropTypes from "prop-types";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Platform,
    Modal,
    Image,
    TextInput,
} from 'react-native';


const dismissKeyboard = require('dismissKeyboard');
export default class Calculator extends Component {

    constructor(props){
        super(props);
        this.state = {
            earnings: '0.00',
            earningsAll: '0.00',
            value: ''
        }
        this.c = '清空';
        this.d = '删除';
        this.mapKey = ['1', '2', '3', '4', '5', '6', '7', '8', '9', this.c, '0', this.d]
        this.moneyValue = this.state.value;
    }
    hideModal = () => {
      this.props.hideModal();
    }
    parssKey = async item => {
        console.log('计算器点击了哪里----->', item);
        if(item === this.c){
            this.moneyValue = ''
        }else if(item === this.d){
            this.moneyValue = this.moneyValue.length === 0 ? '' : this.moneyValue.slice(0, -1);
        }else{
            this.moneyValue += item
        }
        this.setState({
            value: global.outputdollars(this.moneyValue)
        });
        if(this.moneyValue && this.moneyValue > 0){
            const result = await this.fetchCalculator();
            console.log('计算器计算出数值的结果--------->', result);
            try {
                const {totalInterest, totalPrincipal} = result.result;
                this.setState({
                    earnings: (totalInterest / 100).toFixed(2),
                    earningsAll: (totalPrincipal / 100).toFixed(2)
                })
            } catch (error) {
                
            }
        }else{
            this.setState({
                earnings: '0.00',
                earningsAll: '0.00'
            }) 
        }
    }
    fetchCalculator = () => {
        let valueWay = this.props.valueWay;
        let type = this.props.type;
        let yearRate = this.props.yearRate;
        let borrowDate = this.props.borrowDate;
        let amount = this.moneyValue * 100;

        const params = {
            valueWay,
            type,
            yearRate,
            borrowDate,
            amount
        }
        // return HttpUtil.POST(URL.calculator,params)
        return {
            result: {
                totalInterest: 1241512512,
                totalPrincipal: 238582334,
            }
        }
    }
    renderKey = item => {
        let text = item;
        let styleText = styles.keyText
        if(item === this.c || item === this.d){
            text = item
            styleText = styles.keyTextCD
        }
        return (
            <TouchableOpacity onPress={() => this.parssKey(item)} key={item}>
                <View style= {styles.keyView}>
                    <Text style={styleText}>{text}</Text>
                </View>
            </TouchableOpacity>
        )
    }
    render(){
        return (
          <View style={styles.ModalContainer}>
            <View style={styles.ModalBox}>
                <TouchableOpacity onPress={this.hideModal} style={styles.calculatorClose}>
                    <Text>x</Text>
                </TouchableOpacity>
                <View style={styles.formBox}>
                    <TextInput 
                        style={styles.formInput} 
                        ref={ref => this.textInput = ref}
                        value={this.state.value}
                        placeholder="输入投资金额" 
                        placeholderTextColor="#BCC4D1" 
                        underlineColorAndroid="transparent" 
                        editable={false}
                    />
                    <Text style={styles.formUnit}>元</Text>
                </View>
                <View style={styles.formResult}>
                    <View style={styles.formResultRow}>
                        <Text style={styles.formResultLabel}>预期收益</Text>
                        <Text style={styles.formResultValue}>{this.state.earnings + '元'}</Text>
                    </View>
                    <View style={[styles.formResultRow, {'marginTop':SCALE(12)}]}>
                        <Text style={styles.formResultLabel}>本息合计(90天后收回本息)</Text>
                        <Text style={styles.formResultValue}>{this.state.earningsAll + '元'}</Text>
                    </View>
                </View>
                <View style={styles.keybord}>
                    {this.mapKey.map(item => this.renderKey(item))}
                </View>
                <View style={styles.tip}>
                    <Text style={styles.tipText}>收益计算器仅为预期收益，以实际到账金额为准。</Text>
                </View>
            </View>
        </View>
        )
    }

    static propsTypes = {
        valueWay: PropTypes.string.isRequired, //这里是根据参数来获取计算结果

    }
}
const styles = StyleSheet.create({
    ModalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'center'
    },
    ModalBox: {
        width: SCALE(670),
        height: SCALE(800),
        position: 'absolute',
        bottom: SCALE(40),
        backgroundColor: '#fff',
        borderRadius: SCALE(40),
    },
    calculatorClose: {
        width: SCALE(24),
        height: SCALE(24),
        position: 'absolute',
        top: SCALE(40),
        left: SCALE(40),
    },
    formBox: {
        flexDirection: 'row',
        flex: 1,
        height: SCALE(60),
        marginTop: SCALE(54),
        alignItems: 'center',
    },
    formInput: {
        fontSize: FONT(24),
        padding: 0,
        paddingLeft: SCALE(100),
        textAlign: 'right',
        color: '#333B48',
        flex: 1,
    },
    formUnit: {
        fontSize: FONT(24),
        textAlign: 'right',
        paddingRight:SCALE(30),
        paddingLeft: SCALE(26),
        color: '#333B48',
    },

    formResult: {
        height: SCALE(110),
        backgroundColor: '#eef5fc',
        marginTop: SCALE(40),
    },
    formResultRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: SCALE(30),
        paddingRight: SCALE(30),
        marginTop: SCALE(22),
        
    },
    formResultLabel: {
        color: '#666E7B',
    },
    formResultValue: {
        color: '#2B63C9',
    },
    keybord: {
        marginTop: SCALE(34),
        marginLeft: SCALE(22),
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    keyView: {
        width: SCALE(196),
        height: SCALE(90),
        marginTop: SCALE(10),
        marginLeft: SCALE(10),
        backgroundColor: '#F7F7F7',
        borderRadius: SCALE(6),
        alignItems: 'center',
        justifyContent: 'center',
    },
    keyText: {
        color: '#333B48',
        fontSize: FONT(18),
    },
    keyTextCD: {
        color: '#333B48',
        fontSize: FONT(16), 
    },
    tip: {
        height: SCALE(100),
        justifyContent: 'center',
        alignItems: 'center',
    },
    tipText:{
        color: '#9FA5AF',
        fontSize: FONT(10),
    }
});



