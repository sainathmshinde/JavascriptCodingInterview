// find char count

function charCount(str) {
  //make an object to store result
  var result = {};

  //loop over string for each character
  for (var i = 0; i < str.length; i++) {
    var char = str[i];
    //if the char is letter/number AND is key in obj , add one to count
    if (result[char] > 0) {
      result[char]++;
    }
    //if not in obj
    else {
      result[char] = 1;
    }
  }
  return result;
}
