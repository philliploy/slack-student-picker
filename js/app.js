$(document).ready(function() {

   var token = "xoxp-584908689392-594905098400-646784746422-bdb307c9ff6bf86d26b88641a29b7fe2"
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
      return member.name === clickedMember.id
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
      members.push(memb)
      $membersDiv.append('<div id="' + memb.name + '" class="member">' + '<img src="' + memb.profile.image_72 + '" class="img-circle" alt="' + memb.name + '" /><span>' + memb.name + '</span></div>')
    })
    setSpotlight(members[0])
    $loading.hide()
  }

  // init
  $.ajax({
    url: queryURL,
    method: 'GET' 
  }).then(function(response) {
    console.log('Slack Channel Members List:', response.members)
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