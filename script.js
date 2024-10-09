const fs = require("fs");

fs.writeFile("hii.txt", "how are you?", function (err) {
  if (err) {
    console.error(err);
  } else {
    console.log("File created");

    fs.appendFile("hii.txt", " i am fine", function (err) {
      if (err) {
        console.error(err);
      } else {
        console.log("Content appended");

        fs.copyFile("hii.txt", "copy.txt", function (err) {
          if (err) {
            console.error(err);
          } else {
            console.log("File copied");
            fs.rm("./copy", {recursive:true}, function (err) {
                if (err) {
                  console.error(err.message);
                } else {
                  console.log("File copied");
                }
              });
          }
        });
      }
    });
  }
});
