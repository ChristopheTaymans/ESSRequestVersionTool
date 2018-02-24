/*global history */
sap.ui.define([
		"ess/request/version/tool/controller/BaseController",
		"sap/ui/model/json/JSONModel",
		"ess/request/version/tool/model/formatter"
	], function (BaseController, JSONModel, formatter) {
		"use strict";

		return BaseController.extend("ess.request.version.tool.controller.Object", {
			
			formatter: formatter,
			
			/**
			 * Called when the master list controller is instantiated. It sets up the event handling for the master/detail communication and other lifecycle tasks.
			 * @public
			 */
			onInit : function () {				
				this.getRouter().getRoute("objectRoute").attachPatternMatched(this.onObjectRouteMatched, this);	
				this.setModel(new JSONModel({'show':true}),'viewData')
			},
			
			onObjectRouteMatched : function(oEvent){					
				// decode the path given in the URL			
				var path = decodeURIComponent(oEvent.getParameter("arguments").path);			
// if the path is unchanged -> don't make the binding again	
				var oViewBindingCtx = this.getView().getBindingContext();				
				if (oViewBindingCtx && oViewBindingCtx.getPath() == path ){ return };				
				this.getView().unbindElement();				
	         /// bind selected request / target system to view through binding context    	
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
			}
		});
	}
);