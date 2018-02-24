sap.ui.define([
	], function () {
		"use strict";

		return {
			/**
			 * Rounds the currency value to 2 digits
			 *
			 * @public
			 * @param {string} sValue value to be formatted
			 * @returns {string} formatted currency value with 2 digits
			 */
			currencyValue : function (sValue) {
				if (!sValue) {
					return "";
				}

				return parseFloat(sValue).toFixed(2);
			},
			
			getStatusText: function(fStatus){   
				
		    	switch (fStatus) {
		    		case "N":
		    			 return this.getText('NOKStatus');
		    			  break;
		    		 case "O":
		    			 return this.getText('OKStatus');
		    			  break;
		    		 case "T":
		    			 return this.getText('WARNStatus');
		    			    break;    
		    	 };
    		},
    		
			getIconUrl: function(fStatus){   
			
    			var oIcon = undefined;
//    			var oImgSrc =  $.sap.getModulePath("ess.request.version.tool");	

		    	switch (fStatus) {
		    		case "N":
		    			 //oImgSrc += "/img/up.png";
		    			oIcon = "sap-icon://thumb-down";
		    			  break;
		    		 case "O":
		    			 oIcon = "sap-icon://thumb-up";
		    			  break;
		    		 case "T":
		    			 oIcon =  "sap-icon://warning";
		    			    break;    
		    	 };
		    				
    			return oIcon;
    		},

			getImgUrl: function(fStatus){   
    	    var oImgSrc =  $.sap.getModulePath("ess.request.version.tool");		    	    
	    	switch (fStatus) {
    		case "N":
    				oImgSrc += "/img/thumbDown.png";
    				 break;   
    		 case "O":
    			    oImgSrc += "/img/thumbUp.png";
    			    break;   
    		 case "T":
    			  oImgSrc += "/img/warning.png";
    			  break;   
	    	};
    		return oImgSrc;
    		},    		
    		
    		getState: function(fStatus){   

		    	switch (fStatus) {
		    		case "N":		    		
		    			return 'Error';
		    			  break;
		    		 case "O":
		    			return 'Success'
		    			  break;
		    		 case "T":
		    			 return 'Warning';
		    			    break;    
		    	 };
		    				
    		
    		},
    		
    		getVerState: function(flev){   

		    	switch (flev) {

		    		 case "1":
		    			return 'Success'
		    			  break;
		    		 case "0":
		    			 return 'Warning';
		    			    break; 
		    	     default:		    		
		    			return 'Error';
		    			  break;
		    	 };
		    				
    		
    		}
		};

	}
);