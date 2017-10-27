buildRegExp = function(searchText) {
  var parts = searchText.trim()
      .split(/[ \-\:]+/);
  return new RegExp("(" + parts.join('|') + ")", "ig");
}

txtMatch_RegExp = function(Text) {
  return new RegExp('^' + Text.trim() + '$', 'i');
};