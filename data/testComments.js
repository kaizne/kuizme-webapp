const testComments = {
    '1': {
        username: 'pResmETa', date: `${new Date('Saturday August 6 2022 13:01:54 GMT-0700').toUTCString()}`, likes: 10, replies: {
            '1': {
                username: 'redblueorange', date: `${new Date().toUTCString()}`, likes: 5, replies: {},
                text: 'I am replying to your comment. This is the first reply. I am now writing additional text to test the overflow wrapping on the reply comment.'
            },
            '2': {
                username: 'secondreply', date: `${new Date().toUTCString()}`, likes: 2, replies: {},
                text: 'I am replying to your comment. This is the second reply.'
            }
        },
        text: 'I think its hilarious u kids talking about chumb. u wouldnt say this stuff to him at lan, hes jacked. not only that but he wears the freshest clothes, eats at the chillest restaurants and hangs out with the hottest dudes. yall are pathetic lol'
    },
    '2': {
        username: 'fRUDIOUS', date: `${new Date('Sunday July 31 2022 21:04:00 GMT+0500').toUTCString()}`, likes: 72, replies: {},
        text: 'I think its hilarious u kids talking about chumb. u wouldnt say this stuff to him at lan, hes jacked. not only that but he wears the freshest clothes, eats at the chillest restaurants and hangs out with the hottest dudes. yall are pathetic lol'
    },
    '3': {
        username: 'uncEcApH871', date: `${new Date().toUTCString()}`, likes: 14, replies: {
            '1': {
                username: 'test1', date: `${new Date().toUTCString()}`, likes: 4, replies: {},
                text: 'test comment 1'
            }, '2': {
                username: 'test2', date: `${new Date().toUTCString()}`, likes: 4, replies: {},
                text: 'test comment 2'
            }, '3': {
                username: 'test3', date: `${new Date().toUTCString()}`, likes: 4, replies: {},
                text: 'test comment 3'
            }, '4': {
                username: 'test4', date: `${new Date().toUTCString()}`, likes: 4, replies: {},
                text: 'test comment 4'
            }, '5': {
                username: 'test5', date: `${new Date().toUTCString()}`, likes: 4, replies: {},
                text: 'test comment 5'
            }, '6': {
                username: 'test6', date: `${new Date().toUTCString()}`, likes: 4, replies: {},
                text: 'test comment 6'
            }, '7': {
                username: 'test7', date: `${new Date().toUTCString()}`, likes: 4, replies: {},
                text: 'test comment 7'
            }, '8': {
                username: 'test8', date: `${new Date().toUTCString()}`, likes: 4, replies: {},
                text: 'test comment 8'
            }, '9': {
                username: 'test9', date: `${new Date().toUTCString()}`, likes: 4, replies: {},
                text: 'test comment 9'
            }, '10': {
                username: 'test10', date: `${new Date().toUTCString()}`, likes: 4, replies: {},
                text: 'test comment 10'
            }, '11': {
                username: 'test11', date: `${new Date().toUTCString()}`, likes: 4, replies: {},
                text: 'test comment 11'
            }, '12': {
                username: 'test12', date: `${new Date().toUTCString()}`, likes: 4, replies: {},
                text: 'test comment 12'
            }, '13': {
                username: 'test13', date: `${new Date().toUTCString()}`, likes: 4, replies: {},
                text: 'test comment 13'
            }, '14': {
                username: 'test14', date: `${new Date().toUTCString()}`, likes: 4, replies: {},
                text: 'test comment 14'
            }, '15': {
                username: 'test15', date: `${new Date().toUTCString()}`, likes: 4, replies: {},
                text: 'test comment 15'
            }, '16': {
                username: 'test16', date: `${new Date().toUTCString()}`, likes: 4, replies: {},
                text: 'test comment 16'
            }
        },
        text: 'I think its hilarious u kids talking about chumb. u wouldnt say this stuff to him at lan, hes jacked. not only that but he wears the freshest clothes, eats at the chillest restaurants and hangs out with the hottest dudes. yall are pathetic lol'
    },
    '4': {
        username: 'mCfresh', date: `${new Date('Friday July 22 2022 13:01:54 GMT+0200').toUTCString()}`, likes: 83, replies: {},
        text: 'I think its hilarious u kids talking about chumb. u wouldnt say this stuff to him at lan, hes jacked. not only that but he wears the freshest clothes, eats at the chillest restaurants and hangs out with the hottest dudes. yall are pathetic lol'
    },
    '5': {
        username: 'mjdagoat', date: `${new Date('Sunday July 31 2022 11:59:54 GMT+0600').toUTCString()}`, likes: 501, replies: {},
        text: 'I think its hilarious u kids talking about chumb. u wouldnt say this stuff to him at lan, hes jacked. not only that but he wears the freshest clothes, eats at the chillest restaurants and hangs out with the hottest dudes. yall are pathetic lol'
    },
    '6': {
        username: 'yujishuji109481lol', date: `${new Date('Tuesday July 26 2022 13:01:54 GMT+0100').toUTCString()}`, likes: 11, replies: {},
        text: 'I think its hilarious u kids talking about chumb. u wouldnt say this stuff to him at lan, hes jacked. not only that but he wears the freshest clothes, eats at the chillest restaurants and hangs out with the hottest dudes. yall are pathetic lol'
    },
    '7': {
        username: 'alex', date: `${new Date('Wednesday July 27 2022 13:01:54 GMT+0700').toUTCString()}`, likes: 1, replies: {},
        text: 'I think its hilarious u kids talking about chumb. u wouldnt say this stuff to him at lan, hes jacked. not only that but he wears the freshest clothes, eats at the chillest restaurants and hangs out with the hottest dudes. yall are pathetic lol'
    },
    '8': {
        username: 'k', date: `${new Date('Friday July 28 2022 13:01:54 GMT+0700').toUTCString()}`, likes: 2, replies: {},
        text: 'I think its hilarious u kids talking about chumb. u wouldnt say this stuff to him at lan, hes jacked. not only that but he wears the freshest clothes, eats at the chillest restaurants and hangs out with the hottest dudes. yall are pathetic lol'
    },
    '9': {
        username: 'rickross', date: `${new Date('Tuesday March 1 2022 13:01:54 GMT-0600').toUTCString()}`, likes: 3, replies: {
            '1': {
                username: 'pinkpurple', date: `${new Date().toUTCString()}`, likes: 1, replies: {},
                text: 'I am replying to your comment. This is the first reply.'
            }
        },
        text: 'I think its hilarious u kids talking about chumb. u wouldnt say this stuff to him at lan, hes jacked. not only that but he wears the freshest clothes, eats at the chillest restaurants and hangs out with the hottest dudes. yall are pathetic lol'
    },
    '10': {
        username: 'hehexd', date: `${new Date('Friday May 11 2018 13:01:54 GMT-0500').toUTCString()}`, likes: 3, replies: {},
        text: 'I think its hilarious u kids talking about chumb. u wouldnt say this stuff to him at lan, hes jacked. not only that but he wears the freshest clothes, eats at the chillest restaurants and hangs out with the hottest dudes. yall are pathetic lol'
    },
    '11': {
        username: 'beTiCTiV', date: `${new Date('Tuesday January 10 2022 13:01:54 GMT-0600').toUTCString()}`, likes: 9, replies: {},
        text: 'I think its hilarious u kids talking about chumb. u wouldnt say this stuff to him at lan, hes jacked. not only that but he wears the freshest clothes, eats at the chillest restaurants and hangs out with the hottest dudes. yall are pathetic lol'
    },
    '12': {
        username: 'randomUsername', date: `${new Date('Monday July 25 2022 13:01:54 GMT+0500').toUTCString()}`, likes: 54, replies: {},
        text: 'I think its hilarious u kids talking about chumb. u wouldnt say this stuff to him at lan, hes jacked. not only that but he wears the freshest clothes, eats at the chillest restaurants and hangs out with the hottest dudes. yall are pathetic lol'
    },
    '13': {
        username: 'seanbrawn', date: `${new Date('Saturday April 8 2017 13:01:54 GMT+0200').toUTCString()}`, likes: 1, replies: {},
        text: 'I think its hilarious u kids talking about chumb. u wouldnt say this stuff to him at lan, hes jacked. not only that but he wears the freshest clothes, eats at the chillest restaurants and hangs out with the hottest dudes. yall are pathetic lol'
    },
    '14': {
        username: 'bunnyxx', date: `${new Date('Wednesday September 8 2021 13:01:54 GMT+0200').toUTCString()}`, likes: 0, replies: {},
        text: 'I think its hilarious u kids talking about chumb. u wouldnt say this stuff to him at lan, hes jacked. not only that but he wears the freshest clothes, eats at the chillest restaurants and hangs out with the hottest dudes. yall are pathetic lol'
    },
    '15': {
        username: 'lavender', date: `${new Date('Monday July 25 2022 13:01:54 GMT-0100').toUTCString()}`, likes: 0, replies: {},
        text: 'I think its hilarious u kids talking about chumb. u wouldnt say this stuff to him at lan, hes jacked. not only that but he wears the freshest clothes, eats at the chillest restaurants and hangs out with the hottest dudes. yall are pathetic lol'
    },
    '16': {
        username: 'coral', date: `${new Date('Thursday April 7 2022 13:01:54 GMT-0400').toUTCString()}`, likes: 5, replies: {},
        text: 'I think its hilarious u kids talking about chumb. u wouldnt say this stuff to him at lan, hes jacked. not only that but he wears the freshest clothes, eats at the chillest restaurants and hangs out with the hottest dudes. yall are pathetic lol'
    },
    '17': {
        username: 'Kevin Durant', date: `${new Date('Tuesday July 26 2022 13:01:54 GMT-0700').toUTCString()}`, likes: 179, replies: {},
        text: 'I think its hilarious u kids talking about chumb. u wouldnt say this stuff to him at lan, hes jacked. not only that but he wears the freshest clothes, eats at the chillest restaurants and hangs out with the hottest dudes. yall are pathetic lol'
    },
    '18': {
        username: 'Lebron James', date: `${new Date('Wednesday October 13 2021 13:01:54 GMT+0800').toUTCString()}`, likes: 180, replies: {},
        text: 'I think its hilarious u kids talking about chumb. u wouldnt say this stuff to him at lan, hes jacked. not only that but he wears the freshest clothes, eats at the chillest restaurants and hangs out with the hottest dudes. yall are pathetic lol'
    },
    '19': {
        username: 'cantwinwiththesecats', date: `${new Date('Monday February 1 2021 13:01:54 GMT+0100').toUTCString()}`, likes: 1723, replies: {},
        text: 'I think its hilarious u kids talking about chumb. u wouldnt say this stuff to him at lan, hes jacked. not only that but he wears the freshest clothes, eats at the chillest restaurants and hangs out with the hottest dudes. yall are pathetic lol'
    },
    '20': {
        username: 'chumb', date: `${new Date('Saturday July 2 2022 13:01:54 GMT+0200').toUTCString()}`, likes: 10529, replies: {},
        text: 'I think its hilarious u kids talking about chumb. u wouldnt say this stuff to him at lan, hes jacked. not only that but he wears the freshest clothes, eats at the chillest restaurants and hangs out with the hottest dudes. yall are pathetic lol'
    }
}

export default testComments
