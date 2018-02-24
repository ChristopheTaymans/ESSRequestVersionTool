/*global history */
sap.ui.define([
		"ess/request/version/tool/controller/BaseController",
		"sap/ui/model/json/JSONModel",
		"ess/request/version/tool/model/formatter"
	], function (BaseController, JSONModel, formatter) {
		"use strict";

		return BaseController.extend("ess.request.version.tool.controller.Request", {
			
			formatter: formatter,			

			onInit : function () {				
				this.getRouter().getRoute("requestRoute").attachPatternMatched(this.onRequestRouteMatched, this);	
				this.setModel(new JSONModel({'show':false}),'viewData')				
			},
			
			onRequestRouteMatched : function(oEvent){				
				this.byId('objectList').removeSelections();				
// decode the path given in the URL			
				var path = decodeURIComponent(oEvent.getParameter("arguments").path);			
// if the path is unchanged -> don't make the binding again	
				var oViewBindingCtx = this.getView().getBindingContext();
				if (oViewBindingCtx && oViewBindingCtx.getPath() == path ){ 
					return ;					
				};				
				
				this.getView().unbindElement();				
		         /// bind selected request / target system to view through binding context    				
				var oModel = this.getModel();	
				this.getView().bindElement({
					path : path,
					events: {						
						dataRequested : function () {	
							this.setModel(new JSONModel({'show':false}),'viewData')
							this.setBusy(true);
						}.bind(this),
						dataReceived: function (oData) {							
							this.getModel('viewData').setProperty('/show',true);
							this.setBusy(false);	
						}.bind(this)
					}
				});
			},
			
			_onItemPress : function (oEvent) {
				// get the list item, either from the listItem parameter or from the event's source itself (will depend on the device-dependent mode).
				var oBinding = (oEvent.getParameter("listItem") || oEvent.getSource()).getBindingContext();
				var oPath = encodeURIComponent(oBinding.getPath());
				this.getRouter().navTo("objectRoute", {
   					path : oPath
   				});	
			},		
		});
	}
);