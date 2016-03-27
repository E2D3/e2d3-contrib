//# require=d3

//	var svgEle = document.getElementById("myGraph");
	var svgWidth = root.clientWidth;
	var svgHeight = root.clientHeight;
        var yohakuY =20;        //�O���t�㕔�̗]���̂���
 	var offsetX = 55;	// X���W�̃I�t�Z�b�g
        var offsetX1 = 10;      //�@�O���t�E�[�]��
	var offsetY =45;	// Y���W�̃I�t�Z�b�g
        var yAxisHeight=svgHeight-offsetY-yohakuY;   //�����͈̔�
        var xAxisWidth=svgWidth-offsetX-offsetX1;     //�c���͈̔�
	var svgElement = d3.select(root).append('svg')
                                        .attr('width', root.clientWidth)
                                        .attr('height', root.clientHeight);


// #############################################



d3.text("data.csv", function(error, text) {
	var data = d3.csv.parseRows(text);  //CSV�t�@�C���f�[�^�̓ǂݍ���
	var dataSet=[];  //�z��dataset���`
	var dSet=[];  //�z��dSet���`
	var dSetL=[];
        var hanrei_X=200;       //�}���X�ʒu
        var hanrei_Y=200;       //�}���Y�ʒu
        var k=0;




        var circleElements=[];


      // ####################################################
      // csv�f�[�^�̍s���Ɨ񐔂�ǂݍ���
      // ####################################################


	var nagasa=data.length;    //�s��(data�̔z��[��)
        var youso=data[0].length;  //��

        console.log(youso);

       // ####################################################
      // 1�̈ʂŐ؂�̂Ă��s���֐�
      // ####################################################

	function kirishute(num){
		num=num/10;
		return 10*Math.floor(num);
		};



       // ####################################################
      // 1�̈ʂŐ؂�̂Ă��s���֐�
      // ####################################################

 	function kiriage(num){
		num=num/10;
		return 10*Math.ceil(num);
		};




      // ####################################################
      // �n�񖼁A�O���t�̐F�A�}��̈ʒu�AX,Y���̃��x�� �̐ݒ�l���擾
      // ####################################################

	var label1=[];   
	label1=data[0];  //�w�b�_�[�i�[ 

	var iro=[];    
        iro=data[1]; //�O���t�̐��F�ݒ���擾
                    
	var xlab=data[0][0];       //X���@���x����
	var ylab=data[1][0];       //Y���@���x����

 
        var hanrei_X=data[0][youso-1]*1;       //�}���X�ʒu
        var hanrei_Y=data[1][youso-1]*1;       //�}���Y�ʒu

     





      // ####################################################
      // �n�񖼁A�F�����Ȃ��A���l�f�[�^�݂̂�dataSet�Ɋi�[����
      // ####################################################

	for(i=2;i<nagasa;i++){
	dataSet[i-2]=data[i];
	};



      // ##########################################################
      // �n�񂲂ƂɃf�[�^�𕪊�����B dSet:�U�z�}�p ,dSetL:�����p
      // ##########################################################

	var d0=[];
	var d1=[];
	var d2=[];
	var dd0=[];
	var dd1=[];
	var dd2=[];

	for(k=1;k<youso-1;k++){

		for(j=1;j<nagasa-1;j++){
			d0=dataSet[j-1][0]*1;
			d1=dataSet[j-1][k]*1;
			d2=k*1;

			dd0[j-1]=d0;
			dd1[j-1]=d1;
			dd2[j-1]=k*1;

		dSet[(k-1)*(nagasa-2)+j-1]=[d0,d1,d2];
		}

	dSetL[k-1]=d3.transpose(d3.transpose([dd0,dd1,dd2]));

	}

            // console.log(dSet);

      // ##########################################################
      // �f�[�^�̍ő�l,�ŏ��l�����߂�B
      // ##########################################################

// X�n��,Y�n�񂻂ꂼ��@�ő�l,�ŏ��l��10�ȉ��ł���΁A�ő�l�A�ŏ��l�����̂܂܎g���B
 // X�n��,Y�n�񂻂ꂼ��@�ő�l,�ŏ��l��10�ȏ�ł���΁A1�̈ʂŐ؂�グ(@�ő�l) , 1�̈ʂŐ؂�̂�(@�ŏ��l)

	function getMin(num){
        	 if(Math.abs(num)<10) {
			return num;
                             }	
	         else {
                        return kirishute(num);
                      }

                  };

	function getMax(num){
        	 if(Math.abs(num)<10) {
			return num;	
                             }	
	       else {
                        return kiriage(num);
                    }

                 };

     TrdSet=d3.transpose(dSet); //transpose���s��Ȃ��ƁAd3.max, d3.min���g���Ȃ�

 		var maxX  = d3.max(TrdSet[0]);
                    maxX  = getMin(maxX);// X���W�l�ő�

		var maxY = d3.max(TrdSet[1]);
                    maxY = getMax(maxY); // Y���W�l�ő�
            

		var minX = d3.min(TrdSet[0]);
                    minX = getMin(minX);

 		var minY = d3.min(TrdSet[1]);
                    minY = getMin(minY);


      // ##########################################################
      // �X�P�[���ݒ�l�v�Z
      // ##########################################################



		// ���̖ڐ����\�����邽�߂�D3�X�P�[����ݒ�
		var xScale = d3.scale.linear()  // �X�P�[����ݒ�
			.domain([minX, maxX])   // ���̃T�C�Y
			.range([0, xAxisWidth]) // ���ۂ̏o�̓T�C�Y


		// �c�̖ڐ����\�����邽�߂�D3�X�P�[����ݒ�
		var yScale = d3.scale.linear()  // �X�P�[����ݒ�
			.domain([minY, maxY])   // ���̃T�C�Y
			.range([yAxisHeight,0]) // ���ۂ̏o�̓T�C�Y


      // ##########################################################
      // �U�z�}�f�[�^���v���b�g����B
      // ##########################################################


//	var circleElements=d3.select("#myGraph")
	var circleElements=svgElement
		             .selectAll("path")
		             .data(dSet)
                             .enter()
                             .append("path")
                             .attr("transform",function(d) { return "translate(" + (xScale(d[0]*1)+offsetX) + " , " +(yScale(d[1]*1)+yohakuY) + ")"; })
                             .attr("d", d3.svg.symbol().type("circle").size(40))
                             .attr("fill",function(d) { return iro[d[2]]})

      // ##########################################################
      // �֐� drawScale�̒�`
      // ##########################################################


	function drawScale(){


      // ##########################################################
      // Y���̕`�ʐݒ������B    Y���̃��x���`��
      // ##########################################################


	
	svgElement.append("g")	                // g�v�f��ǉ��B���ꂪ�ڐ����\������v�f�ɂȂ�
		   .attr("class", "axis")	// CSS�N���X���w��
		   .attr("transform", "translate("+offsetX*1+", "+(svgHeight-yAxisHeight-1*offsetY)+")")    //���̕`�ʈʒu�̐ݒ�
		   .call(
		           d3.svg.axis()       //y���̐ݒ�
			     .scale(yScale)    //�X�P�[����K�p����
			     .orient("left")   //�ڐ���̕\���ʒu�������Ɏw��
			)
                   .append("text")     //Y���̃��x���`��
                   .attr("dx", "-10em")   //y���W
                   .attr("dy", "-2.2em")
                   .attr("transform", "rotate(" + -90 + ")" )
                   .text(ylab);

      // ##########################################################
      // X���̕`�ʐݒ������B & X���̃��x���ʒu�ݒ�
      // ##########################################################


		// �ڐ����\��  //X���W�\��
		svgElement.append("g")	// g�v�f��ǉ��B���ꂪ�ڐ����\������v�f�ɂȂ�
			.attr("class", "axis")	// CSS�N���X���w��
			.attr("transform", "translate("+offsetX*1+", "+(svgHeight-offsetY)+")")
			.call(
				d3.svg.axis()
				.scale(xScale)  //�X�P�[����K�p����
				.orient("bottom") //�ڐ���̕\���ʒu�������Ɏw��
			)      
                        .append("text")     //X���W���x����\��
                        .attr("transform", "translate("+(svgWidth*0.4)+", "+(offsetY*0.75)+")")
                        .text(xlab);

      // ##########################################################
      // �}��\���ʒu�ݒ�
      // ##########################################################

	for(k=0;k<youso-2;k++){
		svgElement.append("text")
		   .attr("transform", "translate("+(hanrei_X)+", "+(hanrei_Y+20*k)+")")
		   .text(label1[k+1])            //�}�ᕶ���̐ݒ�
  		   .attr("fill",iro[k+1]);       //���̐F��ݒ�
			}
	
      // ##########################################################
      // �⏕���ݒ�
      // ##########################################################



		divX=kirishute((maxX-minX)/5);   //X���⏕�� �Ԋu�v
		divY=kirishute((maxY-minY)/5);   //Y���⏕�� �Ԋu�v
		var grid = svgElement.append("g");
		var rangeX = d3.range(minX, maxX, 20);   // �������Əc�����̃O���b�h�Ԋu����������
		var rangeY = d3.range(minY, maxY, 20);

      // ##########################################################
      // // ���������̃O���b�h��`��         
      // ##########################################################		


		grid.selectAll("line.y")	// line�v�f��y�N���X��I��
			.data(rangeY)	// �c�����͈̔͂��f�[�^�Z�b�g�Ƃ��Đݒ�
			.enter()
			.append("line")	// line�v�f��ǉ�
			.attr("class", "grid")	// CSS�N���X��grid���w��
			.attr("x1", offsetX)     // (x1,y1)-(x2,y2)�̍��W�l��ݒ�
			.attr("y1", function(d, i){
//				return svgHeight - yScale(d) + yohakuY-offsetY;
                                    return yohakuY+yScale(d);
			})
			.attr("x2", xScale(maxX) + offsetX)
			.attr("y2", function(d, i){
//				return svgHeight - yScale(d) + yohakuY-offsetY;
                                     return yohakuY+yScale(d);
			});

      // ##########################################################
      // // ���������̃O���b�h��`��         
      // ##########################################################



		grid.selectAll("line.x")	// line�v�f��x�N���X��I��
			.data(rangeX)	// �������͈̔͂��f�[�^�Z�b�g�Ƃ��Đݒ�
			.enter()
			.append("line")	// line�v�f��ǉ�
			.attr("class", "grid")	// CSS�N���X��grid���w��
			// (x1,y1)-(x2,y2)�̍��W�l��ݒ�
			.attr("x1", function(d, i){
				return xScale(d) + offsetX;
			})
			.attr("y1", svgHeight - offsetY)
			.attr("x2", function(d, i){
				return xScale(d) + offsetX;
			})
			.attr("y2", svgHeight -offsetY - yAxisHeight)


      // ##########################################################
      //   �f�[�^�Ԃ𒼐��Ō��ԁB         
      // ##########################################################





            // ##########################################################
            //  �f�[�^�ԂɈ����ꂽ�����I�u�W�F�N�g�Ƃ��Ē�`����B
            // ##########################################################


		var line = d3.svg.line()
		.x(function(d){ return xScale(d[0]*1) + offsetX; })
		.y(function(d){ return yScale(d[1]*1) + yohakuY; })
	

            // ##########################################################
            //  �e�n�񂲂Ƃɐ���`�ʂ���B
            // ##########################################################


	for(k=0;k<youso-2;k++){
		dSetL[k]=d3.transpose(dSetL[k]);

		       var     line0=svgElement.append("path")            // �p�X��ǉ�
					.attr("d", line(dSetL[k]))        // �z��̍��W��n����path�v�f��d�����ɐݒ�
					.attr("stroke", iro[k+1])         // ���̐F���w�肷��B
					.attr("fill", "none")             // ���̓h��𖳂��ɂ���
			                .attr("stroke-width",4)           // ���̑�����ݒ�B
			                .style("visibility", "visible")   // ����\����Ԃɂ���B
			                .attr("class",dSetL[k][0][2])      // �n��������������������B class�̖{���̎g�����Ƃ͈Ⴄ
					.on("click",function(){                                               // ���̏�̃J�[�\�������C���ォ��O�ꂽ�Ƃ�
						var iro_state=d3.select(this).attr("stroke");                    // ���̐F�����擾�B
 			                	var keiretsu_line= d3.select(this).attr("class"); 
							if(iro_state== "#fbf1f4"){                               // ���̐F���D�F�Ȃ��
								d3.select(this).attr("stroke", iro[keiretsu_line])     // ���̌n�񂲂Ƃɒ�߂��F�ɕύX����B
										}
							else if(iro_state==iro[keiretsu_line]){                 //    ���̌n�񂲂Ƃɒ�߂��F�Ȃ��
								d3.select(this).attr("stroke", "#fbf1f4");     // ���̐F���D�F�ɂ���B
											      }                
								 }); //mouseout�C�x���g�I���

			     }; //for���̏I���  








};   //drawScale()�֐��̏I���


            // ##########################################################
            // �O���t�S�̂̕`�ʂ��s���B
            // ##########################################################

	drawScale();



});   // d3.txt�֐��̏I���













            // ##########################################################
            // �ȉ��͗]���ȃR�[�h
            // ##########################################################


// var tooltip1 = d3.select("body")
//	.append("div")
//	.style("position", "absolute")
//	.style("z-index", "100")
//	.style("visibility", "hidden")
//	.text("a simple tooltip");


//	var circleElements = svg
//		.selectAll("circle")	// circle�v�f��ǉ�
//		.data(dSet)	// �f�[�^�Z�b�g��v�f�ɐݒ�
//	circleElements
//		.enter()
//		.append("circle")	// �f�[�^�̐�����circle�v�f���ǉ������
//		.attr("class", "mark")	// CSS�N���X���w��
//		.attr("cx", function(d, i){
//			return xScale(d[0]*1) + offsetX;	// �ŏ��̗v�f��X���W�ɂ���
//		})
//		.attr("cy", function(d, i){
//			return yScale(d[1]*1)+yohakuY;	// 2�Ԗڂ̗v�f��Y���W�ɂ���
//		})
//		.attr("r", 5)	// ���a���w�肷��
//		.attr("opacity",1.0)
//         .attr("fill",d[2]);


//function mouse11(){
//circleElements.attr("fill", "#fbf1f4");
//	}
//function mouse12(){
//circleElements.attr("fill", iro);
//	}



          //(4) �c�[���`�b�v�𐶐�
	//var tooltip = d3.select("body")
	//	.append("div")
	//	.attr("class", "tip")
// �c�[���`�b�v�Ɏ��ԕ\��
        // circleElements
	//	.on("mouseover", function(d){
	//		var x = parseInt(xScale(d[0]*1));	// �~��X���W�l
	//		var y = parseInt(yScale(d[1]*1)+yohakuY);	// �~��Y���W�l
	//		var data = d3.select(this).datum();
          //            console.log(data);
// �v�f�̃f�[�^��ǂݏo��
//	var t=parseInt(data[2]);
            //        var t="aaaa";
	//		tooltip
	//			.style("left", offsetX+x+"px")
	//			.style("top", y+offsetY+ "px")
	//			.style("visibility", "visible")	// �c�[���`�b�v��\������
	//			.text(t)
	//	})
	//	.on("mouseout", function(){
	//		tooltip.style("visibility", "hidden")	// �c�[���`�b�v���\���ɂ���
          //
	//	});
//     	svgWidth = parseFloat(svgWidth);	// �l�͒P�ʕt���Ȃ̂ŒP�ʂ��폜����
//	svgHeight = parseFloat(svgHeight);	// �l�͒P�ʕt���Ȃ̂ŒP�ʂ��폜����
        
//	var svg = d3.select("#myGraph");	// SVG�v�f���w��

// #############################################

//var margin = { top: 20, right: 30, bottom: 30, left: 40 };       //�O���t���\������Ȃ����̗͂]���̂���
//var margin = { top: 0, right: 0, bottom: 0, left: 0 };
//var  width = root.clientWidth - margin.left - margin.right;      //root.clientWidth �\����ʂ�Width
//var  height = root.clientHeight - margin.top - margin.bottom;    //root.clientHeight �\����ʂ�Width

//var x = d3.scale.ordinal() //x���̐ݒ�
//  .rangeRoundBands([0, width], .1)//root.clientHeight �\����ʂ�Width(�����ɂ���)

//var y = d3.scale.linear()//y���̐ݒ�
//  .rangeRound([height, 0])//height , 0 �̏��ԂŌ��_0�������ɂȂ�B

//var color = d3.scale.category10();//�_�O���t�̐F�ݒ�

//var xAxis = d3.svg.axis()//x�����ڕ\���ݒ�
  //  .scale(x)
    //.orient('bottom');
//var yAxis = d3.svg.axis()//y�����l�\���ݒ�
  //  .scale(y)
  //  .orient('left')

//var chart = d3.select(root).append('svg')
  //  .attr('width', root.clientWidth)
  //  .attr('height', root.clientHeight)
 // .append('g')
   // .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');