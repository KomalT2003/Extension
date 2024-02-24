document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('summarizeButton').addEventListener('click', function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      var tab = tabs[0];
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: function() {
          return document.body.innerText;
        }
      }, function(results) {
        var webpageContent = results[0].result;
        fetch('http://localhost:3000/summarize', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ webpage_content: webpageContent })
        })
        .then(response => response.json())
        .then(data => {
          var summary = data.summary;
          document.getElementById('summary').innerText = summary;
        })
        .catch(error => console.error('Error:', error));
      });
    });
  });
});
