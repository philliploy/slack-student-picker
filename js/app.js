$(document).ready(function() {

   var token = "xoxp-584908689392-594905098400-644122719460-bf114edaa3386b9c7bfc9ad5135dae33"
  var queryURL = 'https://slack.com/api/users.list?token=' + token
  var members = []

  var $loading = $('#loading')
  var $randomizerBtn = $('#randomizer')
  var $membersDiv = $('#members')
  var $spotlight = $('#spotlight')
  var $questionText = $('#question-text')
  var $questionInput = $('#question-input')

  var timeoutID

  var snarkyText = [
    '🤘🏼 Bring it on',
    '😑 Not me. Please, not me.',
    'Who will it be?',
    'The suspense is killing me',
    '🎵 🎵 🎵 (Jeopardy Theme Song plays in background)',
    'Lol who knows? 💁‍',
    '🤔 I wonder...',
    'I can\'t look 🙈',
  ]

  function handleInputChange() {
    $questionText.text(this.value)
  }

  function setSpotlight(member) {
    $spotlight.html('<div class="member"><img src="' + member.profile.image_512 + '" class="img-thumbnail img-circle" alt="' + member.name + '" /><h3>' + member.name + '</h3></div>').slideDown()
    $('.member').removeClass('active')
    $('#' + member.name).addClass('active') 
  }

  function handleMemberClick() {
    var clickedMember = this
    var member = members.find(function(member) {
      return member.name === clickedMember.id && clickedMember.id !="mginnfranz"
      && clickedMember.id !="jturner" && clickedMember.id !="cl54wilks"
      && clickedMember.id !="dave.leo.shilander"
      && clickedMember.id !="dave.leo.shilander_ta"  && clickedMember.id !="remigio.eduardo94"
      && clickedMember.id !="ploy3_98"    && clickedMember.id !="janellecueto"
      && clickedMember.id !="anand92490" && clickedMember.id !="erandro"
      && clickedMember.id !="s.r.corwith" && clickedMember.id !="googledrive"
      && clickedMember.id !="sarahamann96" && clickedMember.id !="neftalisalgado"
      && clickedMember.id !="cody.monta" && clickedMember.id !="alaa.naji.usa_ta"
    })

    
    setSpotlight(member)
  }

  function getRandomMember() {
    var randNum = Math.floor(Math.random() * members.length)
    var randomMember = members[randNum]
    return randomMember
  }

  function pickRandom() {
    var max = 3
    var min = 1
    var randomTimeoutTime = Math.floor(Math.random() * (max - min + 1) + min)
    $spotlight.html('<span class="display-4">' + snarkyText[Math.floor(Math.random() * snarkyText.length)] + '</span>')
    $loading.show()
    clearTimeout(timeoutID) // clear any existing timeouts
    timeoutID = setTimeout(function() {
      var rand = getRandomMember()
      setSpotlight(rand)  
      $loading.hide()
    }, randomTimeoutTime * 1000)
  }

  function renderUI(response) {
    $membersDiv.empty()
    response.members.forEach(function(memb) {

    // clickedMember.id !="mginnfranz"
    //   && clickedMember.id !="jturner" && clickedMember.id !="cl54wilks"
    //   && clickedMember.id !="dave.leo.shilander"
    //   && clickedMember.id !="dave.leo.shilander_ta"  && clickedMember.id !="remigio.eduardo94"
    //   && clickedMember.id !="ploy3_98"    && clickedMember.id !="janellecueto"
    //   && clickedMember.id !="anand92490" && clickedMember.id !="erandro"
    //   && clickedMember.id !="s.r.corwith" && clickedMember.id !="googledrive"
    //   && clickedMember.id !="sarahamann96" && clickedMember.id !="neftalisalgado"
    //   && clickedMember.id !="cody.monta" && clickedMember.id !="alaa.naji.usa_ta"

      if(  memb.name !="mginnfranz"
        &&  memb.name !="jturner" &&  memb.name !="cl54wilks"
       && memb.name !="dave.leo.shilander"
         && memb.name !="dave.leo.shilander_ta"  && memb.name !="remigio.eduardo94"
        && memb.name !="ploy3_98"    && memb.name !="janellecueto"
          && memb.name !="anand92490" && memb.name !="erandro"
         && memb.name !="s.r.corwith" && memb.name !="googledrive"
        && memb.name !="sarahamann96" && memb.name!="neftalisalgado"
         && memb.name !="cody.monta" && memb.name !="alaa.naji.usa_ta" &&  memb.name !="slackbot")
      {
        members.push(memb)
        $membersDiv.append('<div id="' + memb.name + '" class="member">' + '<img src="' + memb.profile.image_72 + '" class="img-circle" alt="' + memb.name + '" /><span>' + memb.name + '</span></div>')
      }
     
    })
    setSpotlight(members[0])
    $loading.hide()
  }

  // init
  $.ajax({
    url: queryURL,
    method: 'GET' 
  }).then(function(response) {



    console.log('Slack Channel Members List:', response.members  )
    renderUI(response)
  }).catch(function(err) {
    var errMessage = '<span style="font-size: 60px;">😞</span><br/> Error fetching data...<br/>'
    errMessage += err
    $randomizerBtn.hide()
    $loading.hide()
    $spotlight.html(errMessage)
  })

  $randomizerBtn.on('click', pickRandom)
  $questionInput.on('input', handleInputChange)
  $(document).on('click', '.member', handleMemberClick)

})