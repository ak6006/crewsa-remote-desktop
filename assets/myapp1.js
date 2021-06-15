var result = '';
var params = {},
  pairs = document.URL.split('?')
    .pop()
    .split('&');
for (var i = 0, p; i < pairs.length; i++) {
  p = pairs[i].split('=');
  params[p[0]] = p[1];
}
var membername = params["membername"];
var roomname = params["roomname"];
$(function () {
  BindEvent();
});
function one() {
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < 16; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  if (roomname != null) {
    sessionStorage.setItem('username', "crew");
    sessionStorage.setItem('password', "@password");
    result = roomname;
     if(localStorage.getItem("username")!=null){
       StartMeeting(roomname,localStorage.getItem("username"));
     }
    else{
      StartMeeting(roomname,"Guest");
    }
  } 
  else {
     if(localStorage.getItem("username")!=null){
       StartMeeting(result,localStorage.getItem("username"));
     }
    else{
      StartMeeting(result,"Guest");
    }
  }
};
function exportToclip() {
    //https://crewmeetpro.page.link/?link=https://meet.crewsa.net/Join-Meeting?roomname%3Dxxxxxxxx%26membername%3Dgust&apn=com.example.crewmeetpro&isi=1561006562&ibi=com.example.crewmeetpro
    //navigator.clipboard.writeText("https://crewmeetpro.page.link/?link=https://meet.crewsa.net/Join-Meeting?roomname%3D" + result + "%26membername%3Dgust&apn=com.example.crewmeetpro&isi=1561006562&ibi=com.example.crewmeetpro");
    //navigator.clipboard.writeText("https://crewmeetpro.page.link/?link=https://meet.crewsa.net/Join-Meeting?roomname%3D" + result + "%26membername%3Dgust&apn=crew.teamigroup.meet&isi=1561006562&ibi=com.example.crewmeetpro");
    navigator.clipboard.writeText("https://go.crewsa.net/"+ result);
    //navigator.clipboard.writeText("https://crewmeetpro.page.link/?link=https://meet.crewsa.net/Join-Meeting?roomname=" + result + "&membername=-&apn=com.example.crewmeetpro");
}
var apiObj = null;
function BindEvent(){
    $("#btnCustomMic").on('click', function () {
        apiObj.executeCommand('toggleAudio');
    });
    $("#btnCustomCamera").on('click', function () {
        apiObj.executeCommand('toggleVideo');
    });
    $("#btnCustomTileView").on('click', function () {
        apiObj.executeCommand('toggleTileView');
    });
    $("#btnScreenShareCustom").on('click', function () {
        apiObj.executeCommand('toggleShareScreen');
    });
}
if (sessionStorage.getItem('EmployeeName') == null) {
            sessionStorage.setItem('EmployeeName','Abo Saleh');
        }
    if (sessionStorage.getItem('RoomName') == null) {
        sessionStorage.setItem('RoomName','Crew Room');
    }
function StartMeeting(roomName,membername){
      if(localStorage.getItem("role")=="Admin")
      {
        const domain = 'go.crewsa.net';
        const options = {
            roomName: roomName,
            width: $(window).width(),
            height: $(window).height(),
            parentNode: document.querySelector('#jitsi-meet-conf-container'),
            userInfo: {
                displayName: membername
            },
            configOverwrite:{
                disableDeepLinking: true,
                prejoinPageEnabled: false,
                startWithVideoMuted:true,
            },
            interfaceConfigOverwrite: {
                toggleLobby: true,
                MOBILE_APP_PROMO: false,
                    DISPLAY_WELCOME_PAGE_CONTENT: false,
                TOOLBAR_BUTTONS: [  'microphone', 'camera', 'closedcaptions', 'desktop', 'fullscreen',
                    'fodeviceselection', 'hangup', 'profile', '', 'chat', 'recording',
                    'livestreaming', 'etherpad', 'sharedvideo', 'settings', 'raisehand',
                    'videoquality', 'filmstrip', 'invite_', 'feedback', 'stats', 'shortcuts',
                    'tileview', 'videobackgroundblur', 'download', 'help', 'mute-everyone',
                    'e2ee', 'security']
            },
            onload: function () {
                $('#toolbox').show();
            }
        };
        apiObj = new JitsiMeetExternalAPI(domain, options);
        apiObj.addEventListener('participantRoleChanged', function (event) {
            if(event.role === 'moderator') {
              apiObj.executeCommand('password', 'creweg');
              apiObj.executeCommand('toggleLobby', true);
              console.log(localStorage.getItem("image"));
              apiObj.executeCommand('avatarUrl',localStorage.getItem("image"));
            }
        }); 
        apiObj.addEventListener('videoConferenceLeft', function (object) {
            console.log("gggggggggggggggggggggg");
            console.log("ExternalAPIEvent " + JSON.stringify(object));
            apiObj.executeCommand('toggleLobby', false);
        }); 
        setTimeout(() => {
            apiObj.addEventListener('videoConferenceLeft', () => {
            apiObj.executeCommand('toggleLobby', false);
            console.log("yyyyyyyyyyyyyyyyyyyyyyyyyy");
            });
          }, 1000);
        apiObj.addEventListeners({
            audioMuteStatusChanged: function (data) {
            console.log("sssssssssssssssssss");
            },
            participantJoined: function(data){
                console.log('participantJoined', data);
                if(data["displayName"]==="Abo Saleh")
                {
                }
            },
        });
      apiObj.executeCommand('subject', 'Crew');
      }
      else{
        const domain = 'go.crewsa.net';
        const options = {
            roomName: roomName,
            width: $(window).width(),
            height: $(window).height(),
            parentNode: document.querySelector('#jitsi-meet-conf-container'),
            userInfo: {
                displayName: membername
            },
            configOverwrite:{
                disableDeepLinking: true,
                prejoinPageEnabled: false,
                startWithVideoMuted:true,
            },
            interfaceConfigOverwrite: {
                toggleLobby: true,
                MOBILE_APP_PROMO: false,
                    DISPLAY_WELCOME_PAGE_CONTENT: false,
                TOOLBAR_BUTTONS: [  'microphone', 'camera', 'closedcaptions_', 'desktop', 'fullscreen',
                'fodeviceselection', 'hangup', 'profile', '', 'chat', 'recording_',
                'livestreaming', 'etherpad_', 'sharedvideo', 'settings', 'raisehand',
                'videoquality', 'filmstrip', 'invite_', 'feedback', 'stats', 'shortcuts',
                'tileview', 'videobackgroundblur', 'download', 'help_', 'mute-everyone_',
                'e2ee', 'security']
            },
            onload: function () {
                 $('#toolbox').show();
            }
        };
        apiObj = new JitsiMeetExternalAPI(domain, options);
        apiObj.addEventListener('participantRoleChanged', function (event) {
            if(event.role === 'moderator') {
               
              apiObj.executeCommand('password', 'creweg');
              apiObj.executeCommand('toggleLobby', true);
              console.log(localStorage.getItem("image"));
              apiObj.executeCommand('avatarUrl',localStorage.getItem("image"));
            }
        }); 
        apiObj.addEventListener('videoConferenceLeft', function (object) {
            console.log("gggggggggggggggggggggg");
            console.log("ExternalAPIEvent " + JSON.stringify(object));
            apiObj.executeCommand('toggleLobby', false);
        }); 
        setTimeout(() => {
            apiObj.addEventListener('videoConferenceLeft', () => {
            apiObj.executeCommand('toggleLobby', false);
            console.log("yyyyyyyyyyyyyyyyyyyyyyyyyy");
            });
          }, 1000);
        apiObj.addEventListeners({
            audioMuteStatusChanged: function (data) {
            console.log("sssssssssssssssssss");
            },
            participantJoined: function(data){
                console.log('participantJoined', data);
                if(data["displayName"]==="Abo Saleh")
                {
                }
            },
        });
       apiObj.executeCommand('subject', 'Crew');
      }
}

function remote(){
  var Url = "https://api.getscreen.me/v1/agents/list?apikey=edPiIV29BKYdSI6lffw7NjEvBodXP4B84GJnfZFTVTvOFSfGEMkck44WlyFjm0fU" ;
  var xhr = new XMLHttpRequest();
  xhr.open('GET', Url, true);
  xhr.send();
  xhr.onreadystatechange = processRequest;
  function processRequest(e) {
   if (xhr.readyState == 4 && xhr.status == 200) {
    var response1 = JSON.parse(xhr.responseText);
    for (i = 0; i < response1.length; i++) {
     var temp=response1[i]["id"].toString() ;
     if(temp == "34689" || temp == "37379" || temp == "40419" || temp == "34691" || temp == "56860" || temp == "56175" || temp == "56196" ){
       var state;
       if(response1[i]["online"]==true)
        {
         state="online";
        }
        else
        {
         state="offline";
        }
       document.getElementById(response1[i]["id"].toString()).innerHTML = state;
     }
    }
      var IMAC2= document.getElementById("34689").innerHTML.toString();
      if(IMAC2=="offline"){
          document.getElementById("IMAC2").style.backgroundColor="gray";
          document.getElementById("IMAC2").disabled=true;
      }
      var Windows1= document.getElementById("37379").innerHTML.toString();
      if(Windows1=="offline"){
          document.getElementById("Windows1").style.backgroundColor="gray";
          document.getElementById("Windows1").disabled = true;
      }
      var Windows2= document.getElementById("40419").innerHTML.toString();
      if(Windows2=="offline"){
          document.getElementById("Windows2").style.backgroundColor="gray";
          document.getElementById("Windows2").disabled = true;
      }
      var IMAC1= document.getElementById("34691").innerHTML.toString();
      if(IMAC1=="offline"){
          document.getElementById("IMAC1").style.backgroundColor="gray";
          document.getElementById("IMAC1").disabled = true;
      }
      var CREWWindows1ProSA= document.getElementById("56860").innerHTML.toString();
      if(CREWWindows1ProSA=="offline"){
          document.getElementById("CREWWindows1ProSA").style.backgroundColor="gray";
          document.getElementById("CREWWindows1ProSA").disabled=true;
      }
      var CREWSiMac1ProSA= document.getElementById("56175").innerHTML.toString();
      if(CREWSiMac1ProSA=="offline"){
          document.getElementById("CREWSiMac1ProSA").style.backgroundColor="gray";
          document.getElementById("CREWSiMac1ProSA").disabled=true;
      }
      var NASERWINDOWSPCs= document.getElementById("56196").innerHTML.toString();
      if(NASERWINDOWSPCs=="offline"){
          document.getElementById("NASERWINDOWSPCs").style.backgroundColor="gray";
          document.getElementById("NASERWINDOWSPCs").disabled=true;
      }
  }
  }

}

function windows1(){
  var Url = "https://api.getscreen.me/v1/agents/connect?apikey=edPiIV29BKYdSI6lffw7NjEvBodXP4B84GJnfZFTVTvOFSfGEMkck44WlyFjm0fU&agent_id=37379";
  var xhr = new XMLHttpRequest();
  xhr.open('POST', Url, true);
  xhr.send();
  xhr.onreadystatechange = processRequest;
  function processRequest(e) {
      if (xhr.readyState == 4 && xhr.status == 200) {
          var response1 = JSON.parse(xhr.responseText);
          sessionStorage.setItem("Url", response1.data['url']);
          sessionStorage.setItem("EmployeeName", "Crew");
          sessionStorage.setItem("RoomName", "Windows1");
          window.open("/meet-pro", "_blank");
      }
  }
}

function windows2(){
  var Url = "https://api.getscreen.me/v1/agents/connect?apikey=edPiIV29BKYdSI6lffw7NjEvBodXP4B84GJnfZFTVTvOFSfGEMkck44WlyFjm0fU&agent_id=40419";
  var xhr = new XMLHttpRequest();
  xhr.open('POST', Url, true);
  xhr.send();
  xhr.onreadystatechange = processRequest;
  function processRequest(e) {
      if (xhr.readyState == 4 && xhr.status == 200) {
          var response1 = JSON.parse(xhr.responseText);
          sessionStorage.setItem("Url", response1.data['url']);
          sessionStorage.setItem("EmployeeName", "Crew");
          sessionStorage.setItem("RoomName", "Windows2");
          window.open("/meet-pro", "_blank");
      }
  }
}

function IMAC1(){
  var Url = "https://api.getscreen.me/v1/agents/connect?apikey=edPiIV29BKYdSI6lffw7NjEvBodXP4B84GJnfZFTVTvOFSfGEMkck44WlyFjm0fU&agent_id=34691";
  var xhr = new XMLHttpRequest();
  xhr.open('POST', Url, true);
  xhr.send();
  xhr.onreadystatechange = processRequest;
  function processRequest(e) {
      if (xhr.readyState == 4 && xhr.status == 200) {
          var response1 = JSON.parse(xhr.responseText);
          sessionStorage.setItem("Url", response1.data['url']);
          sessionStorage.setItem("EmployeeName", "Crew");
          sessionStorage.setItem("RoomName", "IMAC1");
          window.open("/meet-pro", "_blank");
      }
  }
}

function IMAC2(){
  var Url = "https://api.getscreen.me/v1/agents/connect?apikey=edPiIV29BKYdSI6lffw7NjEvBodXP4B84GJnfZFTVTvOFSfGEMkck44WlyFjm0fU&agent_id=34689";
  var xhr = new XMLHttpRequest();
  xhr.open('POST', Url, true);
  xhr.send();
  xhr.onreadystatechange = processRequest;
  function processRequest(e) {
      if (xhr.readyState == 4 && xhr.status == 200) {
          var response1 = JSON.parse(xhr.responseText);
          sessionStorage.setItem("Url", response1.data['url']);
          sessionStorage.setItem("EmployeeName", "Crew");
          sessionStorage.setItem("RoomName", "IMAC2");
          window.open("/meet-pro", "_blank");
      }
  }
}
function CREWWindows1ProSA(){
    var Url = "https://api.getscreen.me/v1/agents/connect?apikey=edPiIV29BKYdSI6lffw7NjEvBodXP4B84GJnfZFTVTvOFSfGEMkck44WlyFjm0fU&agent_id=56860";
    var xhr = new XMLHttpRequest();
    xhr.open('POST', Url, true);
    xhr.send();
    xhr.onreadystatechange = processRequest;
    function processRequest(e) {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var response1 = JSON.parse(xhr.responseText);
            sessionStorage.setItem("Url", response1.data['url']);
            sessionStorage.setItem("EmployeeName", "Crew");
            sessionStorage.setItem("RoomName", "CREWWindows1ProSA");
            window.open("/meet-pro", "_blank");
        }
    }
  }
  function CREWSiMac1ProSA(){
    var Url = "https://api.getscreen.me/v1/agents/connect?apikey=edPiIV29BKYdSI6lffw7NjEvBodXP4B84GJnfZFTVTvOFSfGEMkck44WlyFjm0fU&agent_id=56175";
    var xhr = new XMLHttpRequest();
    xhr.open('POST', Url, true);
    xhr.send();
    xhr.onreadystatechange = processRequest;
    function processRequest(e) {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var response1 = JSON.parse(xhr.responseText);
            sessionStorage.setItem("Url", response1.data['url']);
            sessionStorage.setItem("EmployeeName", "Crew");
            sessionStorage.setItem("RoomName", "CREWSiMac1ProSA");
            window.open("/meet-pro", "_blank");
        }
    }
  }
  function NASERWINDOWSPCs(){
    var Url = "https://api.getscreen.me/v1/agents/connect?apikey=edPiIV29BKYdSI6lffw7NjEvBodXP4B84GJnfZFTVTvOFSfGEMkck44WlyFjm0fU&agent_id=56196";
    var xhr = new XMLHttpRequest();
    xhr.open('POST', Url, true);
    xhr.send();
    xhr.onreadystatechange = processRequest;
    function processRequest(e) {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var response1 = JSON.parse(xhr.responseText);
            sessionStorage.setItem("Url", response1.data['url']);
            sessionStorage.setItem("EmployeeName", "Crew");
            sessionStorage.setItem("RoomName", "NASERWINDOWSPCs");
            window.open("/meet-pro", "_blank");
        }
    }
  }
function FillFrame(){
  document.getElementById("Frame").setAttribute("src",sessionStorage.getItem('Url'));
  StartMeetingAndAccess();
  document.getElementById("jitsi-meet-conf-container").firstChild.style.height = "0px";
  document.getElementById("jitsi-meet-conf-container").firstChild.style.width = "0px";
      
}
function StartMeetingAndAccess(){
  const domain = 'go.crewsa.net';
    const options = {
        roomName: sessionStorage.getItem('RoomName'),
        width: $(window).width(),
        height: $(window).height(),
        parentNode: document.querySelector('#jitsi-meet-conf-container'),
        userInfo: {
            displayName: sessionStorage.getItem('EmployeeName')
        },
        configOverwrite:{
            startWithVideoMuted: true,
            startWithAudioMuted: true,
            enableWelcomePage: false,
            prejoinPageEnabled: false,
        },
        interfaceConfigOverwrite: {
            filmStripOnly: false,
            SHOW_JITSI_WATERMARK: false,
            SHOW_WATERMARK_FOR_GUESTS: false,
            DEFAULT_REMOTE_DISPLAY_NAME: 'New User',
            TOOLBAR_BUTTONS: []
        },
        onload: function () {
            $('#toolbox').show();
        }
    };
    apiObj = new JitsiMeetExternalAPI(domain, options);
    apiObj.addEventListeners({
        readyToClose: function () {
            $('#jitsi-meet-conf-container').empty();
            $('#toolbox').hide();
        },
        audioMuteStatusChanged: function (data) {
            if(data.muted)
            {
                $("#mutestr").attr("src",'../../../assets/Content/mute2.png');
      }
          else
          {
              $("#mutestr").attr("src",'../../../assets/Content/unmute2.png');
          }
        },
        videoMuteStatusChanged: function (data) {
            if(data.muted)
            { 
            $("#camstr").attr("src",'../../../assets/Content/camoff.png');
              document.getElementById("jitsi-meet-conf-container").firstChild.style.height = "0px";
              document.getElementById("jitsi-meet-conf-container").firstChild.style.width = "0px";
      }
          else{
             $("#camstr").attr("src",'../../../assets/Content/cam.png');
              document.getElementById("jitsi-meet-conf-container").firstChild.style.height = "300px";
              document.getElementById("jitsi-meet-conf-container").firstChild.style.width = "300px";

          }
        },
        tileViewChanged: function (data) {
            
        },
        screenSharingStatusChanged: function (data) {
            if(data.on)
                $("#btnScreenShareCustom").text('Stop SS');
            else
                $("#btnScreenShareCustom").text('Start SS');
        },
        participantJoined: function(data){
            console.log('participantJoined', data);
        },
        participantLeft: function(data){
            console.log('participantLeft', data);
        }
    });

    apiObj.executeCommand('subject', 'Teami Group Meet');
}

