export const _useGetFortune = async (phone_number) => {
    // Regular expression to validate the phone number
    const phoneRegex = /^0[89]\d{8}$/;

    // Function to validate the phone number
    const isPhoneNumberValid = (phone_number) => {
        return phoneRegex.test(phone_number);
    };

    // Return false if the phone number is invalid
    if (!isPhoneNumberValid(phone_number)) {
        return false;
    }

    // Function to calculate the sum of digits from the phone number
    const luckyNumberSum = (phone_number) => {
        return phone_number
            .split('') // Split phone number into digits
            .filter(char => !isNaN(char)) // Filter only numeric characters
            .map(Number) // Convert each character to a number
            .reduce((sum, num) => sum + num, 0); // Sum all the digits
    };

    try {
        // Get the sum of the phone number digits
        const sum = luckyNumberSum(phone_number.toString());

        // Find the result by the sum in the local JSON data
        const result = fortuneData.results[sum];

        if (result) {
            return result
        } else {
            return false
        }
    } catch (error) {
        return {
            status: 'error',
            message: 'An error occurred while processing the data',
        };
    }
};

// JSON Data placed at the end for easy management
const fortuneData = {
    "results": {
      "10": {
        "category": "unfortunate",
        "meaning": "มักพบอุปสรรคในชีวิต เส้นทางชีวิตค่อนข้างลำบาก",
        "score": {
          "luck": 3,
          "career": 4,
          "relationship": 5,
          "health": 4,
          "wealth": 3
        }
      },
      "11": {
        "category": "unfortunate",
        "meaning": "ชีวิตไม่มั่นคง มักเกิดความล้มเหลว มีความทุกข์ในชีวิต",
        "score": {
          "luck": 3,
          "career": 4,
          "relationship": 4,
          "health": 4,
          "wealth": 3
        }
      },
      "12": {
        "category": "unfortunate",
        "meaning": "มักเจออุปสรรคในชีวิตและมีเรื่องวุ่นวายบ่อยครั้ง",
        "score": {
          "luck": 3,
          "career": 4,
          "relationship": 4,
          "health": 3,
          "wealth": 3
        }
      },
      "13": {
        "category": "unfortunate",
        "meaning": "ชีวิตที่ต้องต่อสู้และมักมีปัญหาด้านสุขภาพ",
        "score": {
          "luck": 3,
          "career": 3,
          "relationship": 4,
          "health": 3,
          "wealth": 3
        }
      },
      "14": {
        "category": "fortunate",
        "meaning": "ชีวิตมั่นคง สำเร็จในการสื่อสาร มีความเก่งในด้านธุรกิจ",
        "score": {
          "luck": 8,
          "career": 9,
          "relationship": 7,
          "health": 7,
          "wealth": 8
        }
      },
      "15": {
        "category": "very_fortunate",
        "meaning": "มีภาวะผู้นำที่ดี มีโชคลาภ และครอบครัวมีความมั่นคง",
        "score": {
          "luck": 9,
          "career": 9,
          "relationship": 8,
          "health": 8,
          "wealth": 9
        }
      },
      "16": {
        "category": "moderately_fortunate",
        "meaning": "มีความฉลาดและทักษะการตัดสินใจที่ดี แต่บางครั้งต้องเผชิญปัญหาด้านอารมณ์",
        "score": {
          "luck": 7,
          "career": 7,
          "relationship": 6,
          "health": 6,
          "wealth": 7
        }
      },
      "17": {
        "category": "unfortunate",
        "meaning": "มักมีเรื่องยุ่งยากและอุปสรรคเกี่ยวกับการตัดสินใจและอารมณ์",
        "score": {
          "luck": 4,
          "career": 5,
          "relationship": 5,
          "health": 4,
          "wealth": 4
        }
      },
      "18": {
        "category": "unfortunate",
        "meaning": "มีปัญหาเกี่ยวกับการงานและสุขภาพ มักเจอเรื่องเครียดในชีวิต",
        "score": {
          "luck": 4,
          "career": 4,
          "relationship": 4,
          "health": 3,
          "wealth": 4
        }
      },
      "19": {
        "category": "fortunate",
        "meaning": "สำเร็จทุกด้าน มีชื่อเสียงจากความพากเพียรและทำงานหนัก",
        "score": {
          "luck": 8,
          "career": 9,
          "relationship": 7,
          "health": 8,
          "wealth": 8
        }
      },
      "20": {
        "category": "unfortunate",
        "meaning": "ชีวิตมีความไม่แน่นอน มักพบกับความล้มเหลวในด้านการงานและความรัก",
        "score": {
          "luck": 3,
          "career": 4,
          "relationship": 4,
          "health": 4,
          "wealth": 3
        }
      },
      "21": {
        "category": "unfortunate",
        "meaning": "มักมีอุปสรรคและการขัดแย้งในชีวิต การเงินไม่แน่นอน",
        "score": {
          "luck": 3,
          "career": 4,
          "relationship": 4,
          "health": 4,
          "wealth": 3
        }
      },
      "22": {
        "category": "unfortunate",
        "meaning": "ชีวิตไม่มั่นคง มีอุปสรรคที่ต้องผ่านไปให้ได้",
        "score": {
          "luck": 3,
          "career": 4,
          "relationship": 4,
          "health": 4,
          "wealth": 3
        }
      },
      "23": {
        "category": "very_fortunate",
        "meaning": "สำเร็จในด้านการงานและการเงิน มีเพื่อนร่วมงานชื่นชม",
        "score": {
          "luck": 9,
          "career": 9,
          "relationship": 8,
          "health": 8,
          "wealth": 9
        }
      },
      "24": {
        "category": "fortunate",
        "meaning": "โชคลาภและความสำเร็จในด้านความรักและการงาน",
        "score": {
          "luck": 8,
          "career": 8,
          "relationship": 9,
          "health": 8,
          "wealth": 8
        }
      },
      "25": {
        "category": "moderately_fortunate",
        "meaning": "ชีวิตมั่นคง แต่ต้องเผชิญอุปสรรคบ้างในเรื่องความสัมพันธ์",
        "score": {
          "luck": 7,
          "career": 8,
          "relationship": 6,
          "health": 7,
          "wealth": 7
        }
      },
      "26": {
        "category": "moderately_fortunate",
        "meaning": "สำเร็จได้ด้วยความพยายาม แต่มีความกังวลในชีวิตส่วนตัว",
        "score": {
          "luck": 7,
          "career": 8,
          "relationship": 6,
          "health": 6,
          "wealth": 7
        }
      },
      "27": {
        "category": "unfortunate",
        "meaning": "มักมีเรื่องวุ่นวายในชีวิตส่วนตัว การงานอาจไม่มั่นคง",
        "score": {
          "luck": 4,
          "career": 5,
          "relationship": 5,
          "health": 4,
          "wealth": 4
        }
      },
      "28": {
        "category": "moderately_fortunate",
        "meaning": "ชีวิตมีความสมดุล แต่ต้องระวังปัญหาด้านสุขภาพและความรัก",
        "score": {
          "luck": 7,
          "career": 7,
          "relationship": 6,
          "health": 6,
          "wealth": 7
        }
      },
      "29": {
        "category": "fortunate",
        "meaning": "โชคดีในเรื่องความรัก แต่มีปัญหาบ้างในด้านการทำงาน",
        "score": {
          "luck": 8,
          "career": 7,
          "relationship": 9,
          "health": 7,
          "wealth": 7
        }
      },
      "30": {
        "category": "moderately_fortunate",
        "meaning": "ชีวิตมีความสำเร็จปานกลาง ต้องระวังปัญหาด้านการเงิน",
        "score": {
          "luck": 6,
          "career": 7,
          "relationship": 7,
          "health": 6,
          "wealth": 6
        }
      },
      "31": {
        "category": "moderately_fortunate",
        "meaning": "ชีวิตมีความสมดุล แต่ต้องระวังการตัดสินใจที่ผิดพลาด",
        "score": {
          "luck": 7,
          "career": 7,
          "relationship": 7,
          "health": 6,
          "wealth": 6
        }
      },
      "32": {
        "category": "fortunate",
        "meaning": "โชคลาภในด้านความรักและการงาน ชีวิตมีความสุข",
        "score": {
          "luck": 8,
          "career": 8,
          "relationship": 9,
          "health": 8,
          "wealth": 8
        }
      },
      "33": {
        "category": "unfortunate",
        "meaning": "ชีวิตมักวุ่นวาย ต้องระวังเรื่องการตัดสินใจที่ผิดพลาด",
        "score": {
          "luck": 4,
          "career": 4,
          "relationship": 5,
          "health": 4,
          "wealth": 4
        }
      },
      "34": {
        "category": "moderately_fortunate",
        "meaning": "ชีวิตมีความสมดุล แต่ต้องระวังการเงินและสุขภาพ",
        "score": {
          "luck": 7,
          "career": 7,
          "relationship": 6,
          "health": 6,
          "wealth": 7
        }
      },
      "35": {
        "category": "fortunate",
        "meaning": "สำเร็จในด้านการงานและมีความสุขในชีวิตส่วนตัว",
        "score": {
          "luck": 8,
          "career": 8,
          "relationship": 8,
          "health": 8,
          "wealth": 8
        }
      },
      "36": {
        "category": "very_fortunate",
        "meaning": "มีความคิดสร้างสรรค์และสำเร็จในงานที่เกี่ยวกับศิลปะ",
        "score": {
          "luck": 9,
          "career": 9,
          "relationship": 8,
          "health": 8,
          "wealth": 8
        }
      },
      "37": {
        "category": "unfortunate",
        "meaning": "มักเจออุปสรรคในเรื่องงานและชีวิตส่วนตัว",
        "score": {
          "luck": 4,
          "career": 5,
          "relationship": 5,
          "health": 4,
          "wealth": 4
        }
      },
      "38": {
        "category": "unfortunate",
        "meaning": "ชีวิตมีปัญหาเรื่องการงานและสุขภาพ ต้องระวังเป็นพิเศษ",
        "score": {
          "luck": 4,
          "career": 5,
          "relationship": 5,
          "health": 4,
          "wealth": 4
        }
      },
      "39": {
        "category": "moderately_fortunate",
        "meaning": "มีความสำเร็จปานกลาง แต่ต้องพยายามมากขึ้นในด้านความรัก",
        "score": {
          "luck": 7,
          "career": 7,
          "relationship": 6,
          "health": 6,
          "wealth": 7
        }
      },
      "40": {
        "category": "moderately_fortunate",
        "meaning": "ชีวิตสมดุล แต่มีบางครั้งที่พบปัญหาหรือความท้าทาย",
        "score": {
          "luck": 7,
          "career": 7,
          "relationship": 6,
          "health": 7,
          "wealth": 7
        }
      },
      "41": {
        "category": "very_fortunate",
        "meaning": "มีทักษะในการสื่อสารที่ดี นำมาซึ่งความสำเร็จและความมั่นคง",
        "score": {
          "luck": 9,
          "career": 9,
          "relationship": 8,
          "health": 8,
          "wealth": 9
        }
      },
      "42": {
        "category": "fortunate",
        "meaning": "โชคลาภในด้านการงานและความรัก ชีวิตมีความสุข",
        "score": {
          "luck": 8,
          "career": 8,
          "relationship": 9,
          "health": 8,
          "wealth": 8
        }
      },
      "43": {
        "category": "moderately_fortunate",
        "meaning": "ชีวิตสมดุล แต่มีบางครั้งที่ต้องพยายามมากขึ้นเพื่อให้สำเร็จ",
        "score": {
          "luck": 7,
          "career": 7,
          "relationship": 6,
          "health": 7,
          "wealth": 7
        }
      },
      "44": {
        "category": "moderately_fortunate",
        "meaning": "สำเร็จในด้านการงาน แต่ต้องพยายามมากขึ้นเพื่อความสุขในชีวิตส่วนตัว",
        "score": {
          "luck": 7,
          "career": 8,
          "relationship": 6,
          "health": 7,
          "wealth": 7
        }
      },
      "45": {
        "category": "very_fortunate",
        "meaning": "สำเร็จในด้านการงานและชีวิตส่วนตัว มีความมั่นคง",
        "score": {
          "luck": 9,
          "career": 9,
          "relationship": 8,
          "health": 8,
          "wealth": 9
        }
      },
      "46": {
        "category": "fortunate",
        "meaning": "มีโชคลาภในด้านความรักและการงาน ชีวิตมีความสุข",
        "score": {
          "luck": 8,
          "career": 8,
          "relationship": 9,
          "health": 8,
          "wealth": 8
        }
      },
      "47": {
        "category": "moderately_fortunate",
        "meaning": "ชีวิตมีความสมดุล แต่ต้องระวังปัญหาด้านการเงิน",
        "score": {
          "luck": 7,
          "career": 7,
          "relationship": 7,
          "health": 6,
          "wealth": 7
        }
      },
      "48": {
        "category": "moderately_fortunate",
        "meaning": "สำเร็จในด้านการงาน แต่ต้องระวังปัญหาด้านความรักและสุขภาพ",
        "score": {
          "luck": 7,
          "career": 7,
          "relationship": 6,
          "health": 6,
          "wealth": 7
        }
      },
      "49": {
        "category": "fortunate",
        "meaning": "มีความสำเร็จในชีวิตทุกด้าน โชคลาภมาพร้อมกับความพยายาม",
        "score": {
          "luck": 8,
          "career": 8,
          "relationship": 8,
          "health": 8,
          "wealth": 8
        }
      },
      "50": {
        "category": "fortunate",
        "meaning": "ชีวิตมั่นคง มีความสมดุลในด้านสุขภาพ การเงิน และความสัมพันธ์",
        "score": {
          "luck": 8,
          "career": 8,
          "relationship": 8,
          "health": 8,
          "wealth": 8
        }
      },
      "51": {
        "category": "very_fortunate",
        "meaning": "โชคดีมากในด้านความรักและการงาน ชีวิตมีความสมดุล",
        "score": {
          "luck": 9,
          "career": 9,
          "relationship": 9,
          "health": 9,
          "wealth": 9
        }
      },
      "52": {
        "category": "moderately_fortunate",
        "meaning": "ชีวิตมีความสมดุล แต่ต้องระวังปัญหาด้านการเงิน",
        "score": {
          "luck": 7,
          "career": 7,
          "relationship": 6,
          "health": 6,
          "wealth": 7
        }
      },
      "53": {
        "category": "unfortunate",
        "meaning": "ชีวิตเต็มไปด้วยอุปสรรคและความท้าทาย โดยเฉพาะด้านการงาน",
        "score": {
          "luck": 4,
          "career": 4,
          "relationship": 5,
          "health": 4,
          "wealth": 3
        }
      },
      "54": {
        "category": "fortunate",
        "meaning": "มีโชคดีในชีวิตส่วนตัวและการงาน ชีวิตมีความสมดุล",
        "score": {
          "luck": 8,
          "career": 8,
          "relationship": 8,
          "health": 8,
          "wealth": 8
        }
      },
      "55": {
        "category": "very_fortunate",
        "meaning": "มีความมั่นคงและโชคลาภในชีวิต สำเร็จในด้านการงานและความรัก",
        "score": {
          "luck": 9,
          "career": 9,
          "relationship": 9,
          "health": 9,
          "wealth": 9
        }
      },
      "56": {
        "category": "very_fortunate",
        "meaning": "โชคดีมาก ประสบความสำเร็จทั้งในเรื่องการงานและความรัก",
        "score": {
          "luck": 9,
          "career": 9,
          "relationship": 9,
          "health": 8,
          "wealth": 9
        }
      },
      "57": {
        "category": "moderately_fortunate",
        "meaning": "ชีวิตมีความสมดุล แต่ต้องระวังปัญหาด้านสุขภาพและการงาน",
        "score": {
          "luck": 7,
          "career": 7,
          "relationship": 6,
          "health": 6,
          "wealth": 7
        }
      },
      "58": {
        "category": "moderately_fortunate",
        "meaning": "สำเร็จได้ด้วยความพยายาม แต่ต้องระวังปัญหาด้านความรัก",
        "score": {
          "luck": 7,
          "career": 7,
          "relationship": 6,
          "health": 6,
          "wealth": 7
        }
      },
      "59": {
        "category": "very_fortunate",
        "meaning": "มีความเจริญทางจิตใจและประสบความสำเร็จในทุกด้าน นำมาซึ่งความสงบสุข",
        "score": {
          "luck": 9,
          "career": 9,
          "relationship": 8,
          "health": 9,
          "wealth": 9
        }
      },
      "60": {
        "category": "unfortunate",
        "meaning": "ชีวิตไม่มั่นคง อาจต้องเผชิญกับปัญหาด้านการงานและสุขภาพ",
        "score": {
          "luck": 4,
          "career": 5,
          "relationship": 4,
          "health": 3,
          "wealth": 4
        }
      },
      "61": {
        "category": "moderately_fortunate",
        "meaning": "ชีวิตมีความสมดุล แต่ต้องระวังการตัดสินใจที่ผิดพลาด",
        "score": {
          "luck": 7,
          "career": 7,
          "relationship": 6,
          "health": 6,
          "wealth": 7
        }
      },
      "62": {
        "category": "moderately_fortunate",
        "meaning": "สำเร็จได้ด้วยความพยายาม แต่ต้องระวังปัญหาด้านสุขภาพ",
        "score": {
          "luck": 7,
          "career": 7,
          "relationship": 6,
          "health": 6,
          "wealth": 7
        }
      },
      "63": {
        "category": "fortunate",
        "meaning": "โชคลาภในด้านความรักและการงาน ชีวิตมีความสุข",
        "score": {
          "luck": 8,
          "career": 8,
          "relationship": 9,
          "health": 8,
          "wealth": 8
        }
      },
      "64": {
        "category": "fortunate",
        "meaning": "มีความสมดุลในชีวิตส่วนตัวและการงาน มีความสุขในความสัมพันธ์",
        "score": {
          "luck": 8,
          "career": 8,
          "relationship": 9,
          "health": 8,
          "wealth": 8
        }
      },
      "65": {
        "category": "very_fortunate",
        "meaning": "มีความสำเร็จในทุกด้าน โดยเฉพาะในด้านการงานและความรัก",
        "score": {
          "luck": 9,
          "career": 9,
          "relationship": 9,
          "health": 9,
          "wealth": 9
        }
      },
      "66": {
        "category": "very_fortunate",
        "meaning": "ชีวิตเต็มไปด้วยความสุขและความรัก ความสำเร็จด้านการงานและการเงิน",
        "score": {
          "luck": 9,
          "career": 9,
          "relationship": 9,
          "health": 8,
          "wealth": 9
        }
      },
      "67": {
        "category": "moderately_fortunate",
        "meaning": "ชีวิตมีความสมดุล แต่ต้องระวังปัญหาด้านสุขภาพและความรัก",
        "score": {
          "luck": 7,
          "career": 7,
          "relationship": 6,
          "health": 6,
          "wealth": 7
        }
      },
      "68": {
        "category": "moderately_fortunate",
        "meaning": "สำเร็จในด้านการงาน แต่ต้องระวังปัญหาด้านความรักและการเงิน",
        "score": {
          "luck": 7,
          "career": 7,
          "relationship": 6,
          "health": 6,
          "wealth": 7
        }
      },
      "69": {
        "category": "fortunate",
        "meaning": "มีโชคลาภและความสำเร็จในชีวิตส่วนตัวและการงาน",
        "score": {
          "luck": 8,
          "career": 8,
          "relationship": 9,
          "health": 8,
          "wealth": 8
        }
      },
      "70": {
        "category": "unfortunate",
        "meaning": "ชีวิตมักมีความลำบาก และต้องพยายามมากเป็นพิเศษเพื่อความสำเร็จ",
        "score": {
          "luck": 4,
          "career": 5,
          "relationship": 4,
          "health": 4,
          "wealth": 4
        }
      },
      "71": {
        "category": "unfortunate",
        "meaning": "มักพบปัญหาในด้านการงานและความรัก ชีวิตไม่มั่นคง",
        "score": {
          "luck": 4,
          "career": 4,
          "relationship": 4,
          "health": 4,
          "wealth": 4
        }
      },
      "72": {
        "category": "moderately_fortunate",
        "meaning": "มีโชคดีในชีวิตส่วนตัว แต่ต้องระวังปัญหาด้านการเงิน",
        "score": {
          "luck": 7,
          "career": 7,
          "relationship": 6,
          "health": 6,
          "wealth": 7
        }
      },
      "73": {
        "category": "moderately_fortunate",
        "meaning": "สำเร็จได้ด้วยความพยายาม แต่ต้องระวังปัญหาด้านการงาน",
        "score": {
          "luck": 7,
          "career": 7,
          "relationship": 6,
          "health": 6,
          "wealth": 7
        }
      },
      "74": {
        "category": "moderately_fortunate",
        "meaning": "ชีวิตมีความสมดุล แต่ต้องพยายามมากขึ้นเพื่อให้สำเร็จ",
        "score": {
          "luck": 7,
          "career": 7,
          "relationship": 6,
          "health": 6,
          "wealth": 7
        }
      },
      "75": {
        "category": "moderately_fortunate",
        "meaning": "มีความสำเร็จในชีวิตส่วนตัว แต่ต้องระวังเรื่องการงานและการเงิน",
        "score": {
          "luck": 7,
          "career": 7,
          "relationship": 6,
          "health": 6,
          "wealth": 7
        }
      },
      "76": {
        "category": "moderately_fortunate",
        "meaning": "สำเร็จในด้านการงาน แต่มีปัญหาด้านสุขภาพที่ต้องระวัง",
        "score": {
          "luck": 7,
          "career": 7,
          "relationship": 6,
          "health": 6,
          "wealth": 7
        }
      },
      "77": {
        "category": "unfortunate",
        "meaning": "ชีวิตมักวุ่นวาย ต้องระวังเรื่องการตัดสินใจที่ผิดพลาด",
        "score": {
          "luck": 4,
          "career": 4,
          "relationship": 4,
          "health": 4,
          "wealth": 4
        }
      },
      "78": {
        "category": "unfortunate",
        "meaning": "มักมีเรื่องวุ่นวายในชีวิตส่วนตัว การงานอาจไม่มั่นคง",
        "score": {
          "luck": 4,
          "career": 4,
          "relationship": 4,
          "health": 4,
          "wealth": 4
        }
      },
      "79": {
        "category": "moderately_fortunate",
        "meaning": "ชีวิตสมดุล แต่ต้องระวังปัญหาด้านการงานและสุขภาพ",
        "score": {
          "luck": 7,
          "career": 7,
          "relationship": 6,
          "health": 6,
          "wealth": 7
        }
      },
      "80": {
        "category": "unfortunate",
        "meaning": "ชีวิตมีความไม่แน่นอน มักเจอปัญหาเรื่องการเงินและสุขภาพ",
        "score": {
          "luck": 3,
          "career": 4,
          "relationship": 3,
          "health": 3,
          "wealth": 3
        }
      },
      "81": {
        "category": "unfortunate",
        "meaning": "มีความวุ่นวายในชีวิตและปัญหาด้านสุขภาพ",
        "score": {
          "luck": 4,
          "career": 4,
          "relationship": 4,
          "health": 4,
          "wealth": 4
        }
      },
      "82": {
        "category": "moderately_fortunate",
        "meaning": "มีความสำเร็จในชีวิตส่วนตัว แต่ต้องระวังเรื่องการงานและการเงิน",
        "score": {
          "luck": 7,
          "career": 7,
          "relationship": 6,
          "health": 6,
          "wealth": 7
        }
      },
      "83": {
        "category": "unfortunate",
        "meaning": "มักมีเรื่องยุ่งยากและอุปสรรคเกี่ยวกับการตัดสินใจและอารมณ์",
        "score": {
          "luck": 4,
          "career": 4,
          "relationship": 4,
          "health": 4,
          "wealth": 4
        }
      },
      "84": {
        "category": "moderately_fortunate",
        "meaning": "สำเร็จได้ด้วยความพยายาม แต่ต้องระวังปัญหาด้านความรัก",
        "score": {
          "luck": 7,
          "career": 7,
          "relationship": 6,
          "health": 6,
          "wealth": 7
        }
      },
      "85": {
        "category": "moderately_fortunate",
        "meaning": "ชีวิตมีความสมดุล แต่ต้องระวังปัญหาด้านสุขภาพและความรัก",
        "score": {
          "luck": 7,
          "career": 7,
          "relationship": 6,
          "health": 6,
          "wealth": 7
        }
      },
      "86": {
        "category": "moderately_fortunate",
        "meaning": "สำเร็จในด้านการงาน แต่ต้องระวังปัญหาด้านความรักและสุขภาพ",
        "score": {
          "luck": 7,
          "career": 7,
          "relationship": 6,
          "health": 6,
          "wealth": 7
        }
      },
      "87": {
        "category": "moderately_fortunate",
        "meaning": "สำเร็จในด้านการงานและความรัก แต่ต้องระวังปัญหาด้านสุขภาพ",
        "score": {
          "luck": 7,
          "career": 7,
          "relationship": 7,
          "health": 6,
          "wealth": 7
        }
      },
      "88": {
        "category": "very_fortunate",
        "meaning": "โชคดีมากในทุกด้าน โดยเฉพาะเรื่องการเงินและการงาน",
        "score": {
          "luck": 9,
          "career": 9,
          "relationship": 8,
          "health": 9,
          "wealth": 9
        }
      },
      "89": {
        "category": "moderately_fortunate",
        "meaning": "สำเร็จได้ด้วยความพยายาม แต่ต้องระวังปัญหาด้านการงานและความรัก",
        "score": {
          "luck": 7,
          "career": 7,
          "relationship": 6,
          "health": 6,
          "wealth": 7
        }
      },
      "90": {
        "category": "fortunate",
        "meaning": "มีความสำเร็จและความเจริญรุ่งเรืองในชีวิต มีความสงบสุข",
        "score": {
          "luck": 8,
          "career": 9,
          "relationship": 8,
          "health": 8,
          "wealth": 8
        }
      },
      "91": {
        "category": "moderately_fortunate",
        "meaning": "ชีวิตมีความสมดุล แต่ต้องระวังปัญหาด้านการงานและสุขภาพ",
        "score": {
          "luck": 7,
          "career": 7,
          "relationship": 6,
          "health": 6,
          "wealth": 7
        }
      },
      "92": {
        "category": "moderately_fortunate",
        "meaning": "สำเร็จได้ด้วยความพยายาม แต่ต้องระวังปัญหาด้านสุขภาพ",
        "score": {
          "luck": 7,
          "career": 7,
          "relationship": 6,
          "health": 6,
          "wealth": 7
        }
      },
      "93": {
        "category": "moderately_fortunate",
        "meaning": "ชีวิตมีความสมดุล แต่ต้องระวังการตัดสินใจที่ผิดพลาด",
        "score": {
          "luck": 7,
          "career": 7,
          "relationship": 6,
          "health": 6,
          "wealth": 7
        }
      },
      "94": {
        "category": "moderately_fortunate",
        "meaning": "มีความสำเร็จในชีวิตส่วนตัวและการงาน แต่ต้องระวังการเงิน",
        "score": {
          "luck": 7,
          "career": 7,
          "relationship": 6,
          "health": 6,
          "wealth": 7
        }
      },
      "95": {
        "category": "very_fortunate",
        "meaning": "มีโชคลาภและความสำเร็จในชีวิตส่วนตัวและการงาน",
        "score": {
          "luck": 9,
          "career": 9,
          "relationship": 8,
          "health": 9,
          "wealth": 9
        }
      },
      "96": {
        "category": "very_fortunate",
        "meaning": "โชคดีในทุกด้าน โดยเฉพาะเรื่องความรักและการงาน",
        "score": {
          "luck": 9,
          "career": 9,
          "relationship": 9,
          "health": 9,
          "wealth": 9
        }
      },
      "97": {
        "category": "moderately_fortunate",
        "meaning": "สำเร็จได้ด้วยความพยายาม ต้องระวังปัญหาด้านสุขภาพและความรัก",
        "score": {
          "luck": 7,
          "career": 7,
          "relationship": 6,
          "health": 6,
          "wealth": 7
        }
      },
      "98": {
        "category": "very_fortunate",
        "meaning": "ชีวิตเต็มไปด้วยความสุขและความรัก มีโชคลาภในชีวิตส่วนตัวและการงาน",
        "score": {
          "luck": 9,
          "career": 9,
          "relationship": 9,
          "health": 9,
          "wealth": 9
        }
      },
      "99": {
        "category": "very_fortunate",
        "meaning": "โชคดีมากในทุกด้าน ชีวิตมีความสำเร็จและความสุข",
        "score": {
          "luck": 9,
          "career": 9,
          "relationship": 9,
          "health": 9,
          "wealth": 9
        }
      },
      "100": {
        "category": "very_fortunate",
        "meaning": "ชีวิตสมบูรณ์แบบในทุกด้าน มีความมั่งคั่งและความสุขในชีวิต",
        "score": {
          "luck": 10,
          "career": 10,
          "relationship": 9,
          "health": 10,
          "wealth": 10
        }
      }
    }
  };
  
