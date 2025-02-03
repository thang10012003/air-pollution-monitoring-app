const { default: mongoose } = require("mongoose");

//HourlyData là tập hợp những packetData nhưng theo giờ
// Có thể HourlyData là [0h: packetData, 1h: packetData,... 23h: packetData]
// Khi có 1 packetData mới, ví dụ như lúc 13h34 có 1 packetData mới, thì giá trị của hourlyData là [13h: packetData]
//Thành phần của HourlyData : 
//  packetdataid []:  từ id có thể truy xuất đc location, timestamp và các value
//  datacount : số lượng các packet từ phút thứ 0 đến 59 (Hỗ trợ tính avgHour)
//  minValue ? maxValue ? có cần hiện mức ô nhiễm cao nhất và thấp nhất trong 1h không?
// Để HourlyData có 1 json dễ hiểu và dễ truy xuất:
// Date : 17/1/2025
//      Hour : 0
//      Location : Bình Thạnh
//      Data : 00001
//              dataType : AIR-QUALITY 
//              dataValue: [53, 56, 24, 53]
//              Timestamp : [0h0', 0h5', 0h17', 0h43']
//              
//              dataType : CO
//              dataValue: 36
//              Timestamp : 0h15'
//              AQI : Safety
//      Count : 5

//      Hour : 1
//      Location : Bình Thạnh
//      Data : 00005
//              dataType : AIR-QUALITY 
//              dataValue: 555

//              dataType : CO
//              dataValue: 37
//      AQI : Safety
//      Count : 6

// Có thể vẽ biểu đồ để hiển thị mức độ ô nhiễm theo thang đo : Safety : 1, Moderate : 2 , Unhealthy : 3, Hazardhous : 4
//                              ___
// 4                      ___   | |
// 3          ___         | |   | |
// 2    ___   | |   ___   | |   | |
// 1  __| |___| |___| |___| |___| |___....
//      0h     1h   2h    3h     4h
const HourlyDataSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
        default: Date.now(),
    },
    hour_start: [
        {
            type: Number,
            required: true,
            default: Date.now(),
        }
    ],
    packetIds: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "PacketData",
        },
    ],
    dataset: [
        {
            dataType: {
                type: String,
                required: true,
            },
            dataValues: [
                {
                    value: {
                        type: String, 
                        required: true,
                    },
                    timeStamp: {
                        type: Date, 
                        required: true,
                        default: Date.now,
                    },
                },
            ],
        },
    ],
    data_count: {
        type: Number, 
        default: 0,
    }
});
HourlyDataSchema.methods.addPacketId = function(packetId) {
    if (!this.packetIds.includes(packetId)) {
        this.packetIds.push(packetId);
        return this.save();  // Lưu vào DB nếu thêm thành công
    }
    return Promise.resolve(this);  // Nếu đã có rồi, không làm gì
};


const HourlyDataModel = mongoose.model("HourlyData", HourlyDataSchema);
module.exports = HourlyDataModel;
