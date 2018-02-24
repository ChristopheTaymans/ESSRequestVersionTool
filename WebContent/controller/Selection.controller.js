/*global history */
sap.ui.define([
		"ess/request/version/tool/controller/BaseController",
		"sap/ui/model/json/JSONModel",
		"sap/ui/model/Filter",
		"sap/ui/model/FilterOperator",
		"ess/request/version/tool/model/formatter",
		"sap/m/MessageToast"
	], function (BaseController, JSONModel,  Filter, FilterOperator, formatter,MessageToast) {
		"use strict";

		return BaseController.extend("ess.request.version.tool.controller.Selection", {
			
			formatter: formatter,
			
			/**
			 * Called when the master list controller is instantiated. It sets up the event handling for the master/detail communication and other lifecycle tasks.
			 * @public
			 */
			onInit : function () {				
				this.setModel(new JSONModel({ "TargetSysid":undefined, "TargetClient":undefined, "Strkorr":undefined }),'Selection');
				this.requestSyst = undefined;			
				this.oRequestFilter = new Filter( 
						{ path: "TrorderNumber",
					    operator: FilterOperator.Contains,
					    value1: "" 
					    } 
				);				
				this.oDescriptionFilter = new Filter( 
						{ path: "Description",
					    operator: FilterOperator.Contains,
					    value1: "" 
					    } 
				);				
				this.oTicketFilter = new Filter( 
						{ path: "OriginatorKey",
					    operator: FilterOperator.EQ,
					    value1: "" 
					    } 
				);		
			},
					
			onPullToRefresh: function(oEvent){								 
				var oList = this.byId('requestList');	
				var oBinding = oList.getBinding("items");					
				oBinding.attachEventOnce("dataReceived",function(oData){
					this.getView().byId("pullToRefresh").hide();
			      }.bind(this)
			     );				
				this.onRefresh();
			},

			onRefresh : function (oEvent) {		
				var oFilters = [];				
				this.oRequestFilter.oValue1 = this.byId('searchFieldRequest').getValue();				 
				this.oDescriptionFilter.oValue1 = this.byId('searchFieldDescr').getValue();
				this.oTicketFilter.oValue1 = this.byId('searchFieldTicket').getValue();					
				if (this.oRequestFilter.oValue1){ oFilters.push(this.oRequestFilter)};
				if (this.oDescriptionFilter.oValue1){ oFilters.push(this.oDescriptionFilter)};
				if (this.oTicketFilter.oValue1){ oFilters.push(this.oTicketFilter)};				
				this.setModel(new JSONModel({filter : oFilters}),'viewdata');				
		    	var oList = this.byId('requestList');		 
		    	this.getModel('Selection').setProperty('/Strkorr',undefined);
		    	this.requestSyst = undefined;		    	
				var oBinding = oList.getBinding("items");
				oBinding.filter(oFilters, "Application");					
				if (this.getModel('device').getProperty('/support/touch')){
					oBinding.attachEventOnce("dataReceived",function(oData){
							this.getView().byId("pullToRefresh").hide();
					}.bind(this));
				};				
			},
			
			onSelectionChange : function (oEvent) {
				// get the list item, either from the listItem parameter or from the event's source itself (will depend on the device-dependent mode).
				var oBinding = (oEvent.getParameter("listItem") || oEvent.getSource()).getBindingContext();				 
				var oRequest = this.getModel().getProperty(null,oBinding);
			    var oModel = this.getModel('Selection');			 			    
			    if ( oRequest.TrorderSystem && oModel.getProperty('/TargetSysid') == oRequest.TrorderSystem){
			    	oEvent.getSource().removeSelections();
			    	oModel.setProperty('/Strkorr',undefined)
			    	MessageToast.show(this.getText('SystemSelfMessage'));			    
			    }
			    else
			    {
			     this.requestSyst = oRequest.TrorderSystem;
			       oModel.setProperty('/Strkorr',oRequest.TrorderNumber);
			    };			    
			},
			
			_onSystemTarget: function(oEvent){
				var oKey = oEvent.getSource().getSelectedKey().split('|');
			    var oModel = this.getModel('Selection');		
			    if ( this.requestSyst  && this.requestSyst == oKey[0] ){ 
			      	oEvent.getSource().setSelectedKey(undefined);
			      	oModel.setProperty('/TargetSysid',undefined);		
			    	MessageToast.show(this.getText('SystemSelfMessage'));
			    }
			    else {
			    	oModel.setProperty('/TargetSysid',oKey[0]);			  
			    };			   
					   
			  oModel.setProperty('/TargetClient',oKey[1]);			    
			},
			
			_onProceed:function(){				
				var oPath = encodeURIComponent(this.getModel().createKey('/RequestSet',  this.getModel('Selection').getProperty('/')));				
				this.getRouter().navTo("requestRoute", {
   					path : oPath
   				});				
			},
		});
	}
);