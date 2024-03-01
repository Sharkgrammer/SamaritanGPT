let data = {
    "^(good)\\s(morning|afternoon|evening)$": "what are your commands?|how can i help you?|what do you need?",
    "^(hi|hello|greetings)$": "hello|hi",
    "^(good)\\s(night|bye)$": "goodbye|bye|farewell",
    "^(goodbye|bye|farewell)$": "goodbye|bye|farewell",
    "^(find|locate)\\s(john|harold|sameen|samantha|the)\\s(reese|finch|shaw|groves|machine)$": "findCommand",
    "^(kill|eliminate)\\s(john|harold|sameen|samantha|the)\\s(reese|finch|shaw|groves|machine)$": "killCommand",
    "^(identify)\\s(john|harold|sameen|samantha|the)\\s(reese|finch|shaw|groves|machine)$": "identifyCommand",
};

let commandData = {
    "(find|locate)": "searching for|locating|hunting|finding",
    "(kill|eliminate)": "eliminate|assets dispatched for|destroy",
    "(identify)": "unknown",
};

export function checkData() {
    getText("find the machine");
}

export function getText(value) {
    let regex;

    for (let pattern in data) {
        regex = new RegExp(pattern);

        if (regex.test(value.toLowerCase())) {
            return processData(value, data[pattern]);
        }
    }

    return null;
}

function processData(value, data) {

    console.log(value + " " + data);

    switch (data) {
        case "findCommand":
        case "killCommand":
        case "identifyCommand":
            return processCommand(value, data);
    }

    if (data.includes("|")) {

        let temp = data.split("|");

        return temp[Math.floor(Math.random() * temp.length)];
    } else {
        return data;
    }

}

function processCommand(value) {
    let v = value.split(" ");
    let first = v[0], regex;

    for (let pattern in commandData) {
        regex = new RegExp(pattern);

        if (regex.test(first.toLowerCase())) {
            let temp = commandData[pattern].split("|");

            return processData(value, temp[Math.floor(Math.random() * temp.length)] + " " + v[1] + " " + v[2]);
        }
    }

    return null;
}