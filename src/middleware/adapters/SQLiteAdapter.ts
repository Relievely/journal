export function getFeelingData() {

    let mood_DB = [1,2,3,4,5,1,2,3,4,5,1,2,3,4];
    let date = [];
    date[0] = new Date("2019-01-16");
    date[1] = new Date("2019-01-17");
    date[2] = new Date("2019-01-18");
    date[3] = new Date("2019-01-19");
    date[4] = new Date("2019-01-20");
    date[5] = new Date("2019-01-21");
    date[6] = new Date("2019-01-22");
    date[7] = new Date("2019-01-23");
    date[8] = new Date("2019-01-24");
    date[9] = new Date("2019-01-25");
    date[10] = new Date("2019-01-26");
    date[11] = new Date("2019-01-27");
    date[12] = new Date("2019-01-28");
    date[13] = new Date("2019-01-29");

    let data_After = [];
    for(let i = 0; i< mood_DB.length; i++){
        let data_row= {Date : date[i], mood : mood_DB[i]};
        data_After.push(data_row);
    }
    return data_After;
}