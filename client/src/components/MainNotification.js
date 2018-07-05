import React, { Component } from 'react';

class MainNotification extends Component {

  render() {
    return (
      <div className="row">
          <div className="col-lg-12">
              <div className="panel panel-default">
                  <div className="panel-heading">
                      <i className="fa fa-bell fa-fw"></i> Панель уведомлении
                  </div>
                  <div className="panel-body">
                      <div className="list-group">
                        <%for(var i = 0; i < 15; i++){%>
                        <p className="list-group-item">
                          <i className="fa fa-edit fa-fw"></i> <%- history[i].text %>
                          <span className="pull-right text-muted small"><em>
                            <%
                              var date = new Date(history[i].timestamp);
                              var now = new Date();
                              var timeDiff = Math.abs(now.getTime() - date.getTime());
                              var diffMinutes = Math.ceil(timeDiff / (1000 * 60));
                              if(diffMinutes < 60){%>
                                <%=diffMinutes%> минут назад
                              <%}else if((diffMinutes < 60*24) && (now.getDate() === date.getDate())){
                                  var hours = date.getHours();
                                  var mins = ('0'+date.getMinutes()).slice(-2);
                                  var time = hours+":"+mins;
                                %>
                                <%= time%>
                                <%}else if((diffMinutes < 60*24*2) && (now.getDate() - date.getDate() == 1)){
                                    var hours = date.getHours();
                                    var mins = ('0'+date.getMinutes()).slice(-2);
                                    var time = hours+":"+mins;
                                  %>
                                  вчера в <%= time%>
                                <%
                                  }else{
                                    var hours = date.getHours();
                                    var mins = ('0'+date.getMinutes()).slice(-2);
                                    var day = date.getDate();
                                    var m = date.getMonth() + 1;
                                    var y = date.getFullYear();
                                    var d = hours + ":" + mins + " " + day + "." + m + "." + y; %>
                                    <%=d%>
                                  <%}%>
                          </em>
                          </span>
                        </p>
                        <%}%>
                      </div>
                      <a href="../../admin/notifications" className="btn btn-default btn-block">Все уведомления</a>
                  </div>
              </div>
          </div>
      </div>
    );
  }

}

export default MainNotification;
