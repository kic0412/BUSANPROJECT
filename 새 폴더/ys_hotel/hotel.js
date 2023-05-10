function getdata() {
  fetch(
    "https://api.odcloud.kr/api/15096728/v1/uddi:a7cfe5da-2d11-4416-b67f-aff99ee63bbe?page=1&perPage=2893&serviceKey=dvxaXfX6hB3M%2Fhizzw%2BrCC5c9677ILG8ULWYM7y7R5YLKbl332xtCDxaJGj3TBALyf9sGSQktMV5W3hSS60fJg%3D%3D"
  )
    .then((response) => response.json())
    .then((data) => {
      var search = document.getElementById("search").value;
      var results = [];
      for (let i = 0; i < data["data"].length; i++) {
        var title = data["data"][i]["업체명"];
        var add = data["data"][i]["시도명"] + " " + data["data"][i]["시군구명"] + " " + data["data"][i]["읍면동명"] + " " + data["data"][i]["번지"];
        var homepage = data["data"][i]["홈페이지주소"];
        var tellephone = data["data"][i]["전화번호"];
        //여기부턴 표시는 안되는데 필터해야되는거////////////////////
        var close = data["data"][i]["폐업여부"];
        var isCheck = true;
        var arrFilter = document.getElementsByName("filter");
        for (let j=0; j<arrFilter.length;j++){
          if(arrFilter[j].checked == true){
            //체크돼있으면 value 받아와서 데이터확인
            if( data['data'][i][arrFilter[j].value] == "N") {
              //console.log("test");
              isCheck = false;
              break;
            }
          }
        }
        /////////////////////////////////////////////////////////////

        if (isCheck == true && close == "N" && (add.includes(search) || title.includes(search) || search == null)) {
          var resultDiv = document.createElement("div");
          resultDiv.id = "box";

          var titleElement = document.createElement("h3");
          titleElement.textContent = title;
          resultDiv.appendChild(titleElement);

          var addElement = document.createElement("p");
          addElement.textContent = add;
          resultDiv.appendChild(addElement);

          var pageElement = document.createElement("a");
          pageElement.textContent = homepage;
          pageElement.href = homepage;
          resultDiv.appendChild(pageElement);

          var telElement = document.createElement("p");
          telElement.textContent = tellephone;
          resultDiv.appendChild(telElement);

          results.push(resultDiv);
        }
      }
      var resultContainer = document.getElementById("searchResult");
      resultContainer.innerHTML = "";

      if (results.length > 0) {
        for (var i = 0; i < results.length; i++) {
          resultContainer.appendChild(results[i]);
        }
      } else {
        resultContainer.textContent = "검색 결과가 없습니다.";
      }
    });
}