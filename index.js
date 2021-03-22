const Alexa = require('ask-sdk-core');
const i18n = require('i18next');

const languageStrings = {
    en: {
        translation: {
            POSITIVE_SOUND: `<audio src="soundbank://soundlibrary/ui/gameshow/amzn_ui_sfx_gameshow_tally_positive_01"/>`,
            START_SOUND: `<audio src='soundbank://soundlibrary/ui/gameshow/amzn_ui_sfx_gameshow_positive_response_02'/><audio src="soundbank://soundlibrary/magic/amzn_sfx_fairy_sparkle_chimes_01"/>`,
            MAGICAL_SOUND:`<audio src="soundbank://soundlibrary/magic/amzn_sfx_fairy_sparkle_chimes_01"/>`,
            NEG_SOUND: `<audio src="soundbank://soundlibrary/ui/gameshow/amzn_ui_sfx_gameshow_tally_negative_01"/>`,
            END_SOUND:`<audio src="soundbank://soundlibrary/ui/gameshow/amzn_ui_sfx_gameshow_outro_01"/>`,
            GREETING_SPEECHCON: `<voice name="Ivy"><say-as interpret-as="interjection">congrats.</say-as></voice>`,
            END_MSG:`$t(END_SOUND) <voice name="Ivy">Thanks for playing.<say-as interpret-as="interjection">Bye, </say-as></voice>`,
            HELP_START:`<voice name="Ivy"><amazon:emotion name="excited" intensity="high">We didn't start the game yet. </amazon:emotion></voice>
                        <voice name="Ivy"><amazon:emotion name="excited" intensity="high">to start the game just say start the game or initiate the game. </amazon:emotion></voice>`,
            HELP_START_REPROMPT:`<voice name="Ivy"><amazon:emotion name="excited" intensity="high">to start the game just say start the game or initiate the game. </amazon:emotion></voice>`,
            HELP_END: `<voice name="Ivy"><amazon:emotion name="excited" intensity="high">You played very WELL </amazon:emotion></voice>
                        <voice name="Ivy"><amazon:emotion name="excited" intensity="high">to start the game again just say play again or say stop to the stop the game</amazon:emotion></voice>`,
            HELP_MID:`  <voice name="Ivy">
                            <amazon:emotion name="excited" intensity="high">
                            You have given a Question and their respective options 
                            to give the answer say the correct answer name. example I have given a question
                            </amazon:emotion>
                            <lang xml:lang="en-GB">
                                    Where does Dora keep all of her things?
                                    <say-as interpret-as="interjection">the options are</say-as>
                                    option 1 <say-as interpret-as="interjection"> In a treehouse</say-as>
                                    option 2 <say-as interpret-as="interjection"> In her backpack and</say-as>
                                    option 3 <say-as interpret-as="interjection"> At home</say-as>
                            </lang>
                            <amazon:emotion name="excited" intensity="high">
                                    I know Dora keeps her things in backpack so I will say 
                                    In her backpack. 
                                    Here is your question. 
                            </amazon:emotion>
                        </voice>`,
            FALL_START: `<voice name="Ivy"><say-as interpret-as="interjection"> Sorry,</say-as> I don't know about that.</voice> <voice name="Ivy"><amazon:emotion name="excited" intensity="high"> Hey, </amazon:emotion> Do you want the play DORA THE EXPLORER? </voice><voice name="Ivy"> IF you want to play DORA THE EXPLORER say </voice><voice name="Ivy"><say-as interpret-as="interjection"> START DORA THE EXPLORER </say-as></voice> `,
            FALL_END:`<voice name="Ivy"><say-as interpret-as="interjection"> Sorry, </say-as> I don't know about that. </voice><voice name="Ivy"><amazon:emotion name="excited" intensity="high"> </amazon:emotion> Do you want the play DORA THE EXPLORER AGAIN? </voice><voice name="Ivy"> IF you want to play DORA THE EXPLORER AGAIN say </voice><voice name="Ivy"><say-as interpret-as="interjection"> PLAY AGAIN </say-as></voice><voice name="Ivy"> OR </voice><voice name="Ivy"> IF you want to STOP THE GAME say </voice><voice name="Ivy"><say-as interpret-as="interjection"> STOP THE GAME </say-as></voice>`,
            GAME_START : `<voice name="Ivy"><amazon:emotion name="excited" intensity="high">ok, Lets get <say-as interpret-as="interjection"> started </say-as></amazon:emotion></voice><voice name="Ivy"><amazon:emotion name="excited" intensity="high"><say-as interpret-as="interjection"> Here is your first question </say-as></amazon:emotion></voice>`,
            GREET_MSG: '$t(START_SOUND)  $t(WELCOME_MSG.[0]) ',
            CONGO: '$t(POSITIVE_SOUND) $t(GREETING_SPEECHCON) <voice name="Ivy">{{ans}} is the correct answer.</voice>',
            THERE: `<voice name="Ivy"><lang xml:lang="en-US"><say-as interpret-as="interjection">Are you there  </say-as></lang></voice>`,
            WRONG: '$t(NEG_SOUND) <voice name="Ivy"> {{ans}} is wrong.</voice>',
            REFLECTOR_MSG: '<voice name="Ivy">You just triggered {{intent}}</voice>',
            FALLBACK_MSG: `<voice name="Ivy">YOUR ANSWER IS INAPPROPRIATE. This option is not present in the Questions. </voice> <voice name="Ivy"> GIVE THE ANSWER FROM THE GIVEN OPTIONS </voice>`,
            ERROR_MSG: 'Sorry, there was an error. Please try again.',
            NEXT_QUES:`<voice name="Ivy">next question is..</voice>`,
            END_SES:`<audio src="soundbank://soundlibrary/magic/amzn_sfx_fairy_sparkle_chimes_01"/><voice name="Ivy"> you played well. </voice><voice name="Ivy"> you scored {{sco}} out of 20. <say-as interpret-as="interjection">to exit the game say stop</say-as></voice><voice name="Ivy"> else say play again</voice>`
        }
    }
};


var backgroundImage = [
	"https://testingbucketmacde.s3-eu-west-1.amazonaws.com/Dora/554518.jpg",
	"https://testingbucketmacde.s3-eu-west-1.amazonaws.com/Dora/554520.jpg",
	"https://testingbucketmacde.s3-eu-west-1.amazonaws.com/Dora/554506.jpg"
];

function getRandom(data) {
  const index = Math.floor(Math.random() * data.length);
  return index;
}

var welcomeMessage = [
    {'msg':`<say-as interpret-as="interjection">yay </say-as>
        <voice name="Ivy"> Welcome to DORA'S WORLD </voice>
        <voice name="Ivy"> I am DORA and I want to know how much you like 
            <say-as interpret-as="interjection">me.</say-as>
        </voice>
    <voice name="Ivy"> if you would like to start the game say START MY GAME.</voice>`},
    {'msg':`<voice name="Ivy"> Welcome to dora's world </voice><voice name="Ivy"> Dora wants to know meet you and get to know, that how much you like Dora.</voice> <voice name="Ivy"> if you would like to start the game just say START THE GAME.</voice>`},
    {'msg':`<voice name="Ivy"> Welcome to DORA'S WORLD </voice><voice name="Ivy"> I am DORA and I want to know how much you like <say-as interpret-as="interjection">me.</say-as></voice> <voice name="Ivy"> if you would like to start the game just say START MY GAME.</voice>`},
    {'msg':`<voice name="Ivy"><amazon:emotion name="excited" intensity="high">WELCOME</amazon:emotion> to MY world </voice><voice name="Ivy"> I am DORA and </voice><voice name="Ivy"> I want to know that how much you know <say-as interpret-as="interjection">me </say-as></voice><voice name="Ivy"> If you would like to start the game just say START THE GAME OR INITIATE THE GAME.</voice>`}
];

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    async handle (handlerInput) {
        try {
            const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
            var x = Math.floor((Math.random() * 4) + 1);
            
            sessionAttributes.welcomeMessage = {
                "Message" : welcomeMessage[getRandom(welcomeMessage)].msg,
            }       
            let speakOutput  = handlerInput.t('START_SOUND');
            speakOutput  += sessionAttributes.welcomeMessage.Message;
            sessionAttributes.repeatMessage = {
                "Repeat" : speakOutput
            }
            
            if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
                handlerInput.responseBuilder.addDirective({
                        'type': 'Alexa.Presentation.APL.RenderDocument',
                        'token': 'welcomeMessage',
                        'document': require('./APL/Welcome.json')
                })
            }
            
            handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
            return handlerInput.responseBuilder
                    .speak(speakOutput)
                    .reprompt(speakOutput)
                    .getResponse();
        }
        catch(e) {
            console.log('Inside catch');
            console.log(e);
        }
    }
};

//Array of Questions
var quesAns = [
        {   
            'question_Apl': 'What language does Dora speak other than English',
            'answer_Apl':['Spanish','German','French'],
            'question' : `<voice name="Ivy"><lang xml:lang="en-GB">What language does Dora speak other than English, 
                            <say-as interpret-as="interjection">the options are</say-as>
                            option 1 <say-as interpret-as="interjection"> Spanish, </say-as>
                            option 2 <say-as interpret-as="interjection"> German, </say-as>
                            <say-as interpret-as="interjection">and</say-as>
                            option 3 <say-as interpret-as="interjection"> French. </say-as>
                            if you want a hint for this question just say  <say-as interpret-as="interjection"> Hint Me.</say-as></lang></voice>`,
            'answer' : ['spanish','option A','1st option spanish','option 1st','option 1st spanish','first option','first option spanish','option one','option first','option first spanish','option one spanish','option 1','option 1 spanish','option a','option a spanish'],
            'hint' : `<voice name="Ivy"><amazon:emotion name="excited" intensity="high"><say-as interpret-as="interjection">Hey,  </say-as></amazon:emotion>I am here to give you a hint,
                        I will give you two options, One of the option is the correct answer, 
                        <say-as interpret-as="interjection">option 1 </say-as>
                        <say-as interpret-as="interjection"> Spanish.</say-as>
                        <say-as interpret-as="interjection">option 2 </say-as>
                        <say-as interpret-as="interjection"> German. </say-as></voice>`
        },
        {   'question_Apl': `What is the name of Dora's best monkey friend`,
            'answer_Apl':['Boots','Highheels','Shoes'],  //1
            'question' : `<voice name="Ivy"><lang xml:lang="en-GB">What is the name of Dora's best monkey friend, 
                            <say-as interpret-as="interjection">the options are</say-as>
                            option 1 <say-as interpret-as="interjection"> Boots, </say-as>
                            option 2 <say-as interpret-as="interjection"> Highheels, </say-as>
                            <say-as interpret-as="interjection">and</say-as>
                            option 3 <say-as interpret-as="interjection"> Shoes. </say-as></lang></voice>`,
            'answer' : ['boots','option A boots','option A','1st option','1st option boots','option 1st','option 1st boots','first option','first option boots','option one','option first','option first boots','option one boots','option 1','option 1 boots','option a','option a boots'],
            'hint' : `<voice name="Ivy"><amazon:emotion name="excited" intensity="high"><say-as interpret-as="interjection">Hey,  </say-as></amazon:emotion>I am here to give you a hint,
                        I will give you two options, One of the option is the correct answer, 
                        <say-as interpret-as="interjection">option 1 </say-as>
                        <say-as interpret-as="interjection"> Boots.</say-as>
                        <say-as interpret-as="interjection">option 2 </say-as>
                        <say-as interpret-as="interjection"> Highheels. </say-as></voice>`
        },
        {   'question_Apl': `What is the name of the fox who always tries to take Dora's things`,
            'answer_Apl':['Swiper','Stealer','Burglar'],                                                                                                                                             //2
            'question' : `<voice name="Ivy"><lang xml:lang="en-GB">What is the name of the fox who always tries to take Dora's things, 
                            <say-as interpret-as="interjection">the options are</say-as>
                            option 1 <say-as interpret-as="interjection"> Swiper, </say-as>
                            option 2 <say-as interpret-as="interjection"> Stealer, </say-as>
                            <say-as interpret-as="interjection">and</say-as>
                            option 3 <say-as interpret-as="interjection"> Burglar. </say-as></lang></voice>`,
            'answer' : ['swiper','option A','1st option','1st option swiper','option 1st','option 1st swiper','first option','first option swiper','option one','option first','option first swiper','option one swiper','option 1','option 1 swiper','option a','option a swiper'],
            'hint' : `<voice name="Ivy"><amazon:emotion name="excited" intensity="high"><say-as interpret-as="interjection">Hey,  </say-as></amazon:emotion>I am here to give you a hint,
                        I will give you two options, One of the option is the correct answer, 
                        <say-as interpret-as="interjection">option 1 </say-as>
                        <say-as interpret-as="interjection"> Swiper.</say-as>
                        <say-as interpret-as="interjection">option 2 </say-as>
                        <say-as interpret-as="interjection"> Stealer. </say-as></voice>`
        },
        {    
            'question_Apl': `Who do Dora and Boots ask for help when they don't know which way to go`,
            'answer_Apl':['Compass','Globe','Map'],                                                                                                                        //3
            'question' : `<voice name="Ivy"><lang xml:lang="en-GB">Who do Dora and Boots ask for help when they don't know which way to go, 
                            <say-as interpret-as="interjection">the options are</say-as>
                            option 1 <say-as interpret-as="interjection"> Compass, </say-as>
                            option 2 <say-as interpret-as="interjection"> Globe, </say-as>
                            <say-as interpret-as="interjection">and</say-as>
                            option 3 <say-as interpret-as="interjection"> Map. </say-as></lang></voice>`,
            'answer' : ['compass','1st option','option A','1st option compass','option 1st','option 1st compass','first option','first option compass','option one','option first','option first compass','option one compass','option 1','option 1 compass','option a','option a compass'],
            'hint' : `<voice name="Ivy"><amazon:emotion name="excited" intensity="high"><say-as interpret-as="interjection">Hey,  </say-as></amazon:emotion>I am here to give you a hint,
                        I will give you two options, One of the option is the correct answer, 
                        <say-as interpret-as="interjection">option 1 </say-as>
                        <say-as interpret-as="interjection"> Compass.</say-as>
                        <say-as interpret-as="interjection">option 2 </say-as>
                        <say-as interpret-as="interjection"> Globe. </say-as></voice>`
        },
        {   
            'question_Apl': `What is hola in English`,
            'answer_Apl':['Hello','Good night','Good Morning'],                                                                                                             //4
            'question' :`<voice name="Ivy"><lang xml:lang="en-GB">What is hola in English, 
                            <say-as interpret-as="interjection">the options are</say-as>
                            option 1 <say-as interpret-as="interjection"> Hello, </say-as>
                            option 2 <say-as interpret-as="interjection"> Good night, </say-as>
                            <say-as interpret-as="interjection">and</say-as>
                            option 3 <say-as interpret-as="interjection"> Good Morning. </say-as></lang></voice>`,
            'answer' : ['hello','1st option','option A','1st option hello','option 1st','option 1st hello','first option','first option hello','option one','option one hello','option first','option first hello','option 1','option 1 hello','option a','option a hello'],
            'hint' : `<voice name="Ivy"><amazon:emotion name="excited" intensity="high"><say-as interpret-as="interjection">Hey,  </say-as></amazon:emotion>I am here to give you a hint,
                        I will give you two options, One of the option is the correct answer, 
                        <say-as interpret-as="interjection">option 1 </say-as>
                        <say-as interpret-as="interjection"> Hello.</say-as>
                        <say-as interpret-as="interjection">option 2 </say-as>
                        <say-as interpret-as="interjection"> Good night. </say-as></voice>`
        },
        {   
            'question_Apl': `What kind of animal is Swiper`,
            'answer_Apl':['Fox','Monkey','Donkey'],                                                                                                             //5
            'question' : `<voice name="Ivy"><lang xml:lang="en-GB">What kind of animal is Swiper, 
                            <say-as interpret-as="interjection">the options are</say-as>
                            option 1 <say-as interpret-as="interjection"> fox, </say-as>
                            option 2 <say-as interpret-as="interjection"> monkey, </say-as>
                            <say-as interpret-as="interjection">and</say-as>
                            option 3 <say-as interpret-as="interjection"> donkey. </say-as></lang></voice>`,
            'answer' : ['fox','1st option','option A','1st option fox','option 1st','option 1st fox','first option','first option fox','option one','option one fox','option first','option first fox','option 1','option 1 fox','option a','option a fox'],
            'hint' : `<voice name="Ivy"><amazon:emotion name="excited" intensity="high"><say-as interpret-as="interjection">Hey,  </say-as></amazon:emotion>I am here to give you a hint,
                        I will give you two options, One of the option is the correct answer, 
                        <say-as interpret-as="interjection">option 1 </say-as>
                        <say-as interpret-as="interjection"> Fox.</say-as>
                        <say-as interpret-as="interjection">option 2 </say-as>
                        <say-as interpret-as="interjection"> Monkey. </say-as></voice>`
        },
        {   
            'question_Apl': `What colour is Dora’s backpack`,
            'answer_Apl':['Purple','Pink','Black'],                                                                                                                 //6
            'question' : `<voice name="Ivy"><lang xml:lang="en-GB">What colour is Dora’s backpack, 
                            <say-as interpret-as="interjection">the options are</say-as>
                            option 1 <say-as interpret-as="interjection"> Purple, </say-as>
                            option 2 <say-as interpret-as="interjection"> Pink, </say-as>
                            <say-as interpret-as="interjection">and</say-as>
                            option 3 <say-as interpret-as="interjection"> Black. </say-as></lang></voice>`,
            'answer' :  ['purple','1st option','option A','1st option purple','option 1st','option 1st purple','first option','first option purple','option one','option one purple','option first','option first one','option 1','option 1 purple','option a','option a purple'],
            'hint' : `<voice name="Ivy"><amazon:emotion name="excited" intensity="high"><say-as interpret-as="interjection">Hey,  </say-as></amazon:emotion>I am here to give you a hint,
                        I will give you two options, One of the option is the correct answer, 
                        <say-as interpret-as="interjection">option 1 </say-as>
                        <say-as interpret-as="interjection"> Purple.</say-as>
                        <say-as interpret-as="interjection">option 2 </say-as>
                        <say-as interpret-as="interjection"> Pink. </say-as></voice>`
        },
        {   
            'question_Apl': `What must Dora say three times to stop Swiper from stealing`,
            'answer_Apl':['Swiper No Swiping','Oi!','No!'],                                                                                                                 //7
            'question' : `<voice name="Ivy"><lang xml:lang="en-GB">What must Dora say three times to stop Swiper from stealing, 
                            <say-as interpret-as="interjection">the options are</say-as>
                            option 1 <say-as interpret-as="interjection"> swiper </say-as><say-as interpret-as="interjection">No swiping.</say-as>
                            option 2 <say-as interpret-as="interjection"> Oi!, </say-as>
                            <say-as interpret-as="interjection">and</say-as>
                            option 3 <say-as interpret-as="interjection"> No! </say-as></lang></voice>`,
            'answer' : ['swiper no swiping','option A','1st option','1st option swiper no swiping','option 1st','option 1st swiper no swiping','first option','first option swiper no swiping','option one','option first','option first swiper no swiping','option one swiper no swiping','option 1','option 1 swiper no swiping','option a','option a swiper no swiping'],
            'hint' : `<voice name="Ivy"><amazon:emotion name="excited" intensity="high"><say-as interpret-as="interjection">Hey,  </say-as></amazon:emotion>I am here to give you a hint,
                        I will give you two options, One of the option is the correct answer, 
                        <say-as interpret-as="interjection">option 1 </say-as>
                        <say-as interpret-as="interjection"> swiper </say-as><say-as interpret-as="interjection">No swiping.</say-as>
                        <say-as interpret-as="interjection">option 2 </say-as>
                        <say-as interpret-as="interjection"> No! </say-as></voice>`
        },
        {    
            'question_Apl': `What should we use in rain`,                                                                                                                            //8
            'answer_Apl':['Shirt','Book','Umbrella'],
            'question' : `<voice name="Ivy"><lang xml:lang="en-GB">What should we use in rain, 
                            <say-as interpret-as="interjection">the options are</say-as>
                            option 1 <say-as interpret-as="interjection"> shirt.</say-as>
                            option 2 <say-as interpret-as="interjection"> Book, </say-as>
                            <say-as interpret-as="interjection">and</say-as>
                            option 3 <say-as interpret-as="interjection"> Umbrella </say-as></lang></voice>`,
            'answer' :  ['umbrella','option C','third option','third option umbrella','option three','option third','option third umbrella','option three umbrella','option 3','option 3 umbrella','option c','option c umbrella',
                         '3rd option','3rd option Umbrella','option 3rd','option 3rd Umbrella','1st option','1st option Umbrella','option 1st','option 1st Umbrella','first option','first option Umbrella','option one','option one umbrella','option first','option first umbrella','option 1','option 1 Umbrella','option a','option a Umbrella'],
            'hint' : `<voice name="Ivy"><amazon:emotion name="excited" intensity="high"><say-as interpret-as="interjection">Hey,  </say-as></amazon:emotion>I am here to give you a hint,
                        I will give you two options, One of the option is the correct answer, 
                        <say-as interpret-as="interjection">option 1 </say-as>
                        <say-as interpret-as="interjection"> Umbrella. </say-as>
                        <say-as interpret-as="interjection">option 2 </say-as>
                        <say-as interpret-as="interjection"> Book. </say-as></voice>`
        },
        {   'question_Apl': `What kind of animal is Leon`,                                                                                                                          //9
            'answer_Apl':['Lion','Giraffe','Bird'], 
            'question' : `<voice name="Ivy"><lang xml:lang="en-GB">What kind of animal is Leon, 
                            <say-as interpret-as="interjection">the options are</say-as>
                            option 1 <say-as interpret-as="interjection"> Lion.</say-as>
                            option 2 <say-as interpret-as="interjection"> Giraffe, </say-as>
                            <say-as interpret-as="interjection">and</say-as>
                            option 3 <say-as interpret-as="interjection"> Bird. </say-as></lang></voice>`,
            'answer' : ['lion','option A','1st option','1st option lion','option 1st','option 1st lion','first option','first option lion','option one','option one lion','option first','option first lion','option 1','option 1 lion','option a','option a lion'],
            'hint' : `<voice name="Ivy"><amazon:emotion name="excited" intensity="high"><say-as interpret-as="interjection">Hey,  </say-as></amazon:emotion>I am here to give you a hint,
                        I will give you two options, One of the option is the correct answer, 
                        <say-as interpret-as="interjection">option 1 </say-as>
                        <say-as interpret-as="interjection"> lion. </say-as>
                        <say-as interpret-as="interjection">option 2 </say-as>
                        <say-as interpret-as="interjection"> Bird. </say-as></voice>`
        },
        {   
            'question_Apl': `What does Dora call her Granny`,                                                                                                                       //10
            'answer_Apl':['Abuela','Nanny','Granny'],     
            'question' : `<voice name="Ivy"><lang xml:lang="en-GB">What does Dora call her granny, 
                            <say-as interpret-as="interjection">the options are</say-as>
                            option 1 <say-as interpret-as="interjection"> Abuela.</say-as>
                            option 2 <say-as interpret-as="interjection"> Nanny, </say-as>
                            <say-as interpret-as="interjection">and</say-as>
                            option 3 <say-as interpret-as="interjection"> Granny. </say-as></lang></voice>`,
            'answer' : ['abuela','option A','1st option','1st option abuela','option 1st','option 1st abuela','first option','first option abuela','option one','option first','option first abuela','option one abuela','option 1','option 1 abuela','option a','option a abuela'],
            'hint' : `<voice name="Ivy"><amazon:emotion name="excited" intensity="high"><say-as interpret-as="interjection">Hey,  </say-as></amazon:emotion>I am here to give you a hint,
                        I will give you two options, One of the option is the correct answer, 
                        <say-as interpret-as="interjection">option 1 </say-as>
                        <say-as interpret-as="interjection"> abuela. </say-as>
                        <say-as interpret-as="interjection">option 2 </say-as>
                        <say-as interpret-as="interjection"> Granny. </say-as></voice>`
        },
        {   
            'question_Apl': `What is Dora's last name`,                                                                                                                             //11
            'answer_Apl':['Marquez','Torres','Velez'],    
            'question' : `<voice name="Ivy"><lang xml:lang="en-GB">Okay, this question is a toughie, but I know you guys can get it! What is Dora's last name, 
                            <say-as interpret-as="interjection">the options are</say-as>
                            option 1 <say-as interpret-as="interjection"> Marquez, </say-as>
                            option 2 <say-as interpret-as="interjection"> Torres, </say-as>
                            <say-as interpret-as="interjection">and</say-as>
                            option 3 <say-as interpret-as="interjection"> Velez. </say-as></lang></voice>`,
            'answer' : ['marquez','option A','1st option','1st option marquez','1st option Marquez','option 1st','option 1st marquez','option 1st Marquez','first option','first option marquez','first option Marquez','option one','option first','option first marquez','option first Marquez','option one marquez','option one Marquez','option 1','option 1 marquez','option 1 Marquez','option a','option a marquez','option a Marquez'],
            'hint' : `<voice name="Ivy"><amazon:emotion name="excited" intensity="high"><say-as interpret-as="interjection">Hey,  </say-as></amazon:emotion>I am here to give you a hint,
                        I will give you two options, One of the option is the correct answer, 
                        <say-as interpret-as="interjection">option 1 </say-as>
                        <say-as interpret-as="interjection"> Marquez. </say-as>
                        <say-as interpret-as="interjection">option 2 </say-as>
                        <say-as interpret-as="interjection"> Velez. </say-as></voice>`
        },
        {   
            'question_Apl': `Dora's map and backpack can talk`,                                                                                                                     //12
            'answer_Apl':['True','False'],
            'question' : `<voice name="Ivy"><lang xml:lang="en-GB">Dora's map and backpack can talk, 
                            <say-as interpret-as="interjection">the options are</say-as>
                            option 1 <say-as interpret-as="interjection"> true, </say-as>
                            <say-as interpret-as="interjection">and</say-as>
                            option 2 <say-as interpret-as="interjection"> false. </say-as></lang></voice>`,
            'answer' : ['false','option B','option2','second option false', 'second option', 'option second', 'option second false','2nd option','2nd option false','option 2nd','option 2nd false','option two false','option b false','option 2 false'],
            'hint' : `<voice name="Ivy"><amazon:emotion name="excited" intensity="high"><say-as interpret-as="interjection">Hey,  </say-as></amazon:emotion>I am here to give you a hint,
                        I will give you two options, One of the option is the correct answer, 
                        <say-as interpret-as="interjection">option 1 </say-as>
                        <say-as interpret-as="interjection"> true. </say-as>
                        <say-as interpret-as="interjection">option 2 </say-as>
                        <say-as interpret-as="interjection"> false. </say-as></voice>`
        },
        {                                                                                                                                                                               //13
            'question_Apl': `Dora is a ...`,
            'answer_Apl': ['Taco','Potato','Explorer'],
            'question' : `<voice name="Ivy"><lang xml:lang="en-GB">Dora is a ..., 
                            <say-as interpret-as="interjection">the options are</say-as>
                            option 1 <say-as interpret-as="interjection"> Taco, </say-as>
                            option 2 <say-as interpret-as="interjection"> Potato, </say-as>
                            <say-as interpret-as="interjection">and</say-as>
                            option 3 <say-as interpret-as="interjection"> Explorer. </say-as></lang></voice>`, 
            'answer' :  ['explorer','option C','option A','third option','third option explorer','option three','option third','option third explorer','option three explorer','option 3','option 3 explorer','option c','option c explorer',
                         '3rd option','3rd option explorer','option 3rd','option 3rd explorer','1st option','1st option explorer','option 1st','option 1st explorer','first option','first option explorer','option one','option first','option first explorer','option one explorer','option 1','option 1 explorer','option a','option a explorer'],
            'hint' : `<voice name="Ivy"><amazon:emotion name="excited" intensity="high"><say-as interpret-as="interjection">Hey,  </say-as></amazon:emotion>I am here to give you a hint,
                        I will give you two options, One of the option is the correct answer, 
                        <say-as interpret-as="interjection">option 1 </say-as>
                        <say-as interpret-as="interjection"> explorer. </say-as>
                        <say-as interpret-as="interjection">option 2 </say-as>
                        <say-as interpret-as="interjection"> Potato. </say-as></voice>`
        },
        {   
            'question_Apl': `What is the color of Dora's hair`,                                                                                                                         //14
            'answer_Apl':['Red','Black or Brown','Purple'],  
            'question' : `<voice name="Ivy"><lang xml:lang="en-GB">What is the color of Doras hair, 
                            <say-as interpret-as="interjection">the options are</say-as>
                            option 1 <say-as interpret-as="interjection"> Red, </say-as>
                            option 2 <say-as interpret-as="interjection"> Black or Brown, </say-as>
                            <say-as interpret-as="interjection">and</say-as>
                            option 3 <say-as interpret-as="interjection"> Purple. </say-as></lang></voice>`,
            'answer' :  ['black or brown','black and brown','option B','option A','second option','second option black or brown','option second','option second black or brown','option two','option two black or brown','option 2','option 2 black or brown','option b','option b black or brown',
                         '2nd option','2nd option black or brown','option 2nd','option 2nd black or brown','1st option','1st option black or brown','option 1st','option 1st black or brown','first option','first option black or brown','option one','option first','option first black or brown','option one black or brown','option 1','option 1 black or brown','option a','option a black or brown'],
            'hint' : `<voice name="Ivy"><amazon:emotion name="excited" intensity="high"><say-as interpret-as="interjection">Hey,  </say-as></amazon:emotion>I am here to give you a hint,
                        I will give you two options, One of the option is the correct answer, 
                        <say-as interpret-as="interjection">option 1 </say-as>
                        <say-as interpret-as="interjection"> black or brown. </say-as>
                        <say-as interpret-as="interjection">option 2 </say-as>
                        <say-as interpret-as="interjection"> Purple. </say-as></voice>`
        },
        {                                                                                                                                                                               //15
            'question_Apl': `What Dora don't do`,
            'answer_Apl':['Sing','Count','Cheat'], 
            'question' : `<voice name="Ivy"><lang xml:lang="en-GB">What Dora don't do, 
                            <say-as interpret-as="interjection">the options are</say-as>
                            option 1 <say-as interpret-as="interjection"> Sing, </say-as>
                            option 2 <say-as interpret-as="interjection"> Count, </say-as>
                            <say-as interpret-as="interjection">and</say-as>
                            option 3 <say-as interpret-as="interjection"> Cheat. </say-as></lang></voice>`, 
            'answer' :  ['cheat','option C','option A','third option','third option cheat','option three','option third','option third cheat','option three cheat','option 3','option 3 cheat','option c','option c cheat',
                         '3rd option','3rd option cheat','option 3rd','option 3rd cheat','1st option','1st option cheat','option 1st','option 1st cheat','first option','first option cheat','option one','option first','option first cheat','option one cheat','option 1','option 1 cheat','option a','option a cheat'],
             'hint' : `<voice name="Ivy"><amazon:emotion name="excited" intensity="high"><say-as interpret-as="interjection">Hey,  </say-as></amazon:emotion>I am here to give you a hint,
                        I will give you two options, One of the option is the correct answer, 
                        <say-as interpret-as="interjection">option 1 </say-as>
                        <say-as interpret-as="interjection"> cheat. </say-as>
                        <say-as interpret-as="interjection">option 2 </say-as>
                        <say-as interpret-as="interjection"> Count. </say-as></voice>`
        },
        {                                                                                                                                                                                   //16
            'question_Apl': `Dora has a dog named Alexander that helps her get to her destination in every episode`,
            'answer_Apl':['True','False'],           
            'question' : `<voice name="Ivy"><lang xml:lang="en-GB">Dora has a dog named Alexander that helps her get to her destination in every episode, 
                            <say-as interpret-as="interjection">the options are</say-as>
                            option 1 <say-as interpret-as="interjection"> true, </say-as>
                            <say-as interpret-as="interjection">and</say-as>
                            option 2 <say-as interpret-as="interjection"> false. </say-as></lang></voice>`,
            'answer' : ['false','option B','option 2','second option false', 'second option', 'option second', 'option second false','2nd option','2nd option false','option 2nd','option 2nd false','option two false','option b false','option 2 false'],
            'hint' : `<voice name="Ivy"><amazon:emotion name="excited" intensity="high"><say-as interpret-as="interjection">Hey,  </say-as></amazon:emotion>I am here to give you a hint,
                        I will give you two options, One of the option is the correct answer, 
                        <say-as interpret-as="interjection">option 1 </say-as>
                        <say-as interpret-as="interjection"> true. </say-as>
                        <say-as interpret-as="interjection">option 2 </say-as>
                        <say-as interpret-as="interjection"> false. </say-as></voice>`
        },
        {   
            'question_Apl': `What is the tree they get chocolate from called`,                                                                                                      //17
            'answer_Apl':['The coconut tree','The chocolate tree','The apple tree'],    
            'question' : `<voice name="Ivy"><lang xml:lang="en-GB">What is the tree they get chocolate from called, 
                            <say-as interpret-as="interjection">the options are</say-as>
                            option 1 <say-as interpret-as="interjection"> The coconut tree, </say-as>
                            option 2 <say-as interpret-as="interjection"> The chocolate tree, </say-as>
                            <say-as interpret-as="interjection">and</say-as>
                            option 3 <say-as interpret-as="interjection"> The apple tree. </say-as></lang></voice>`, 
            'answer' :  ['the chocolate tree','option C','option A','chocolate tree','second option','second option the chocolate tree','option second','option second the chocolate tree','option two','option two the chocolate tree','option 2','option 2 the chocolate tree','option b','option b the chocolate tree',
                         '2nd option','2nd option the chocolate tree','2nd option chocolate tree','option 2nd','option 2nd the chocolate tree','option 2nd chocolate tree','1st option','1st option the chocolate tree','1st option chocolate tree','option 1st','option 1st the chocolate tree','option 1st chocolate tree','first option','first option the chocolate tree','option one','option first','option first the chocolate tree','option one the chocolate tree','option 1','option 1 the chocolate tree','option a','option a the chocolate tree'],
            'hint' : `<voice name="Ivy"><amazon:emotion name="excited" intensity="high"><say-as interpret-as="interjection">Hey,  </say-as></amazon:emotion>I am here to give you a hint,
                        I will give you two options, One of the option is the correct answer, 
                        <say-as interpret-as="interjection">option 1 </say-as>
                        <say-as interpret-as="interjection"> the chocolate tree. </say-as>
                        <say-as interpret-as="interjection">option 2 </say-as>
                        <say-as interpret-as="interjection"> the apple tree. </say-as></voice>`
        },
        {                                                                                                                                                                           //18
            'question_Apl': `Dora's map is named Louis`,
            'answer_Apl':['True','False'],
            'question' : `<voice name="Ivy"><lang xml:lang="en-GB">Dora's map is named Louis, 
                            <say-as interpret-as="interjection">the options are</say-as>
                            option 1 <say-as interpret-as="interjection"> true, </say-as>
                            <say-as interpret-as="interjection">and</say-as>
                            option 2 <say-as interpret-as="interjection"> false. </say-as></lang></voice>`, 
            'answer' : ['false','option 2','second option false', 'second option', 'option second', 'option second false','2nd option','2nd option false','option 2nd','option 2nd false','option two false','option b false','option 2 false'],
            'hint' : `<voice name="Ivy"><amazon:emotion name="excited" intensity="high"><say-as interpret-as="interjection">Hey,  </say-as></amazon:emotion>I am here to give you a hint,
                        I will give you two options, One of the option is the correct answer, 
                        <say-as interpret-as="interjection">option 1 </say-as>
                        <say-as interpret-as="interjection"> true. </say-as>
                        <say-as interpret-as="interjection">option 2 </say-as>
                        <say-as interpret-as="interjection"> false. </say-as></voice>`
        },
        {                                                                                                                                                                            //19
            'question_Apl': `What is Dora's emotion most of the time`,
            'answer_Apl':['Happy','Sad','Angry'],  
            'question' : `<voice name="Ivy"><lang xml:lang="en-GB"> this is the last Question. What is Dora's emotion most of the time, 
                          <say-as interpret-as="interjection">the options are</say-as>
                            option 1 <say-as interpret-as="interjection"> Happy, </say-as>
                            option 2 <say-as interpret-as="interjection"> Sad, </say-as>
                            <say-as interpret-as="interjection">and</say-as>
                            option 3 <say-as interpret-as="interjection"> Angry. </say-as></lang></voice>`, 
            'answer' : ['happy','1st option','1st option happy','option 1st','option 1st happy','first option','first option happy','option one','option first','option first happy','option one happy','option 1','option 1 happy','option a','option a happy'],            
            'hint' : `<voice name="Ivy"><amazon:emotion name="excited" intensity="high"><say-as interpret-as="interjection">Hey,  </say-as></amazon:emotion>I am here to give you a hint,
                        I will give you two options, One of the option is the correct answer, 
                        <say-as interpret-as="interjection">option 1 </say-as>
                        <say-as interpret-as="interjection"> happy. </say-as>
                        <say-as interpret-as="interjection">option 2 </say-as>
                        <say-as interpret-as="interjection"> angry. </say-as></voice>`
        }
    ];

const StartGameIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'StartGameIntent';
    },
    handle(handlerInput) {
        try {
            const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
            sessionAttributes.questionAnswer = {
                "Question" : quesAns[0].question,
                "Answer" : quesAns[0].answer,
                "index": 0,
                "score": 0,
                "hint": quesAns[0].hint
            }
            var speakOutput = handlerInput.t('GAME_START');
            speakOutput += sessionAttributes.questionAnswer.Question;
            
            if (!sessionAttributes.repeatMessage) {
                sessionAttributes.repeatMessage = {
                    "Repeat" : speakOutput
                }
            }
            else {
                sessionAttributes.repeatMessage.Repeat = speakOutput;   
            }
            
            if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
                var background = backgroundImage[getRandom(backgroundImage)];
                
                handlerInput.responseBuilder.addDirective({
                        'type': 'Alexa.Presentation.APL.RenderDocument',
                        'token': 'Question',
                        'document': require('./APL/Question.json'),
                        "datasources": {
                            "QuestionDetails": {
                                "Bg": background,
                                "Question": quesAns[0].question_Apl,
                                "Answers": quesAns[0].answer_Apl
                            }
                        }
                })
            }
            
            handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
            return handlerInput.responseBuilder
                .speak(speakOutput)
                .reprompt('are you there?'+ sessionAttributes.questionAnswer.Question)
                .getResponse();
        }
        catch(e) {
            console.log('catch');
            console.log(e)
        }
        
    }
};

const AnswerIntentHandler = {
    canHandle(handlerInput) {
             return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
             && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AnswerIntent';
    },
    handle(handlerInput) {
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        var slotAns, questionAnswer = sessionAttributes.questionAnswer, index = questionAnswer.index, score = questionAnswer.score;
        
        slotAns = handlerInput.requestEnvelope.request.intent.slots.ans.value;
        slotAns = slotAns.toLowerCase();
        if (!sessionAttributes.questionAnswer) {
            return handlerInput.responseBuilder
                .speak(speakOutput)
                .reprompt(repro + questionAnswer.Question)
                .getResponse();
        }
        let speakOutput, repro;
         if (index < 20) {
            var ansArray = questionAnswer.Answer;
            if (ansArray.indexOf(slotAns) !== -1) {   
                speakOutput = handlerInput.t('CONGO',{ans: questionAnswer.Answer[0]}); 
                score ++;
                index ++;
            }
            else {
                speakOutput = handlerInput.t('WRONG',{ans: slotAns});
                index ++;
            }
            if (index <= 19) {
                questionAnswer.Question = quesAns[index].question;
                questionAnswer.question_Apl = quesAns[index].question_Apl;
                questionAnswer.answer_Apl = quesAns[index].answer_Apl;
                questionAnswer.Answer = quesAns[index].answer;
                questionAnswer.hint = quesAns[index].hint;
                questionAnswer.score = score;
                questionAnswer.index = index;
                speakOutput += handlerInput.t('NEXT_QUES'); 
                speakOutput += questionAnswer.Question;
            }
            else {
                speakOutput +=  handlerInput.t('END_SES',{sco: score});   
            }
        }  
        sessionAttributes.repeatMessage.Repeat = speakOutput;
        handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
        repro = handlerInput.t('THERE');
        
        console.log(index);
        
        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL'] && index > 19) {
            
            handlerInput.responseBuilder.addDirective({
                    'type': 'Alexa.Presentation.APL.RenderDocument',
                    'token': 'welcomeMessage',
                    'document': require('./APL/Welcome.json')
            })
        }
        
        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
                var background = backgroundImage[getRandom(backgroundImage)];
                
                handlerInput.responseBuilder.addDirective({
                        'type': 'Alexa.Presentation.APL.RenderDocument',
                        'token': 'Question',
                        'document': require('./APL/Question.json'),
                        "datasources": {
                            "QuestionDetails": {
                                "Bg": background,
                                "Question": sessionAttributes.questionAnswer.question_Apl,
                                "Answers": sessionAttributes.questionAnswer.answer_Apl
                            }
                        }
                })
        }
            
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(repro + questionAnswer.Question)
            .getResponse();
    }
};

const TouchAnswerIntentHandler = {
    canHandle(handlerInput) {
             return handlerInput.requestEnvelope.request.type === 'Alexa.Presentation.APL.UserEvent'
             && handlerInput.requestEnvelope.request.token === 'Question';
    },
    handle(handlerInput) {
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        var slotAns, questionAnswer = sessionAttributes.questionAnswer, index = questionAnswer.index, score = questionAnswer.score;
        
        slotAns = handlerInput.requestEnvelope.request.arguments[0];
        slotAns = slotAns.toLowerCase();
        
        let speakOutput, repro;
         if (index < 20) {
            var ansArray = questionAnswer.Answer;
            if (ansArray.indexOf(slotAns) !== -1) {   
                speakOutput = handlerInput.t('CONGO',{ans: questionAnswer.Answer[0]}); 
                score ++;
                index ++;
            }
            else {
                speakOutput = handlerInput.t('WRONG', { ans: slotAns });   
                index ++;
            }
            
            if (index <= 19) {
                questionAnswer.Question = quesAns[index].question;
                questionAnswer.question_Apl = quesAns[index].question_Apl;
                questionAnswer.answer_Apl = quesAns[index].answer_Apl;
                questionAnswer.Answer = quesAns[index].answer;
                questionAnswer.hint = quesAns[index].hint;
                questionAnswer.score = score;
                questionAnswer.index = index;
                speakOutput += handlerInput.t('NEXT_QUES'); 
                speakOutput += questionAnswer.Question;
            }
            else {
                speakOutput +=  handlerInput.t('END_SES',{sco: score});   
            }
        }  
        sessionAttributes.repeatMessage.Repeat = speakOutput;
        handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
        repro = handlerInput.t('THERE');
        
        console.log(index);
        
        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL'] && index > 19) {
            
            handlerInput.responseBuilder.addDirective({
                    'type': 'Alexa.Presentation.APL.RenderDocument',
                    'token': 'welcomeMessage',
                    'document': require('./APL/Welcome.json')
            })
        }
        
        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
                var background = backgroundImage[getRandom(backgroundImage)];
                
                handlerInput.responseBuilder.addDirective({
                        'type': 'Alexa.Presentation.APL.RenderDocument',
                        'token': 'Question',
                        'document': require('./APL/Question.json'),
                        "datasources": {
                            "QuestionDetails": {
                                "Bg": background,
                                "Question": sessionAttributes.questionAnswer.question_Apl,
                                "Answers": sessionAttributes.questionAnswer.answer_Apl
                            }
                        }
                })
        }
            
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(repro + questionAnswer.Question)
            .getResponse();
    }
};

const RepeatIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'RepeatIntent';
    },
    handle(handlerInput) {
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
            let speakOutput = sessionAttributes.repeatMessage.Repeat;
            
        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
            
            handlerInput.responseBuilder.addDirective({
                    'type': 'Alexa.Presentation.APL.RenderDocument',
                    'token': 'welcomeMessage',
                    'document': require('./APL/Welcome.json')
            })
        }
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const HintIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'HintIntent';
    },
    handle(handlerInput) {
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        //Retriving the QuestionAnswer Object
        var questionAnswer = sessionAttributes.questionAnswer;
        //Retriving the index value from QuestionAnswer Object
        var index = questionAnswer.index;
        //Retriving the score of the user from QuestionAnswer Object
        var score = questionAnswer.score;
        let speakOutput;
        
        if (index < 19) {
            speakOutput = questionAnswer.hint;
        }
        else if (index > 19)
            speakOutput = 'You played well To start the game again jsut say play again';
            sessionAttributes.repeatMessage.Repeat = speakOutput;
            
            
        handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        try { 
            let speakOutput, reprompt;
            const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
            
            if (sessionAttributes.questionAnswer) {
                var questionAnswer = sessionAttributes.questionAnswer;
                var index = questionAnswer.index;
            
                if (index < 20) {
                    speakOutput = handlerInput.t('HELP_MID');
                    speakOutput += questionAnswer.Question;
                    reprompt = handlerInput.t('HELP_MID');
                }
                else {
                    speakOutput = handlerInput.t('HELP_END');
                    reprompt = handlerInput.t('HELP_END');
                }
            }
            else {
                speakOutput = handlerInput.t('HELP_START');
                reprompt = handlerInput.t('HELP_START_REPROMPT');
            }
            
            if (!sessionAttributes.repeatMessage) {
                sessionAttributes.repeatMessage = {
                    "Repeat" : speakOutput
                }
            }
            else {
                sessionAttributes.repeatMessage.Repeat = speakOutput;   
            }
            
            handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
            return handlerInput.responseBuilder
                .speak(speakOutput)
                .reprompt(reprompt)
                .withShouldEndSession(false)
                .getResponse();
        }
        catch(e) {
            console.log('-------------In Help Intent Error---------------');
            console.log(e);
        }
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        const speakOutput = handlerInput.t(`END_MSG`);
        
        if (!sessionAttributes.repeatMessage) {
            sessionAttributes.repeatMessage = {
                "Repeat" : speakOutput
            }
        }
        else {
            sessionAttributes.repeatMessage.Repeat = speakOutput;   
        }
        
        handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        let speakOutput;
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        
        if(sessionAttributes.questionAnswer) {
            if (sessionAttributes.questionAnswer.index < 20)
                speakOutput = handlerInput.t('FALLBACK_MSG');
            else
                speakOutput = handlerInput.t('FALL_END');
        }
        else {
            speakOutput = handlerInput.t('FALL_START');
        }
        
        if (!sessionAttributes.repeatMessage) {
            sessionAttributes.repeatMessage = {
                "Repeat" : speakOutput
            }
        }
        else {
            sessionAttributes.repeatMessage.Repeat = speakOutput;   
        }
        
        handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
        
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
    }
};

const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = handlerInput.t(`REFLECTOR_MSG`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const speakOutput = 'Sorry, I had trouble doing what you asked. Please try again.';
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const RequestLog = {
    process(handlerInput) {
        console.log("REQUEST ENVELOPE = " + JSON.stringify(handlerInput.requestEnvelope));
    return;
    }
};

const LoggingRequestInterceptor = {
    process(handlerInput) {
        console.log(`Incoming request: ${JSON.stringify(handlerInput.requestEnvelope)}`);
    }
};

const LoggingResponseInterceptor = {
    process(handlerInput, response) {
        console.log(`Outgoing response: ${JSON.stringify(response)}`);
    }
};

const LocalisationRequestInterceptor = {
    process(handlerInput) {
        i18n.init({
            lng: Alexa.getLocale(handlerInput.requestEnvelope),
            resources: languageStrings
        }).then((t) => {
            handlerInput.t = (...args) => t(...args);
        });
    }
};

exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        StartGameIntentHandler,
        AnswerIntentHandler,
        TouchAnswerIntentHandler,
        HintIntentHandler,
        HelpIntentHandler,
        RepeatIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
    .addRequestInterceptors(
        LocalisationRequestInterceptor,
        LoggingRequestInterceptor)
    .addResponseInterceptors(
        LoggingResponseInterceptor)
    .lambda();