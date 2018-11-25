<div class="sidebar-category">
    <div class="category-title">
        <span>Filter</span>
        <ul class="icons-list">
            <li><a href="#" data-action="collapse"></a></li>
        </ul>
    </div>
    <div class="category-content">
        <div class="form-group">
            <label><strong>Tahun Akademik :</strong></label>
            <com:TActiveDropDownList ID="tbCmbTA" OnCallback="Page.changeTbTA" CssClass="form-control">
                <prop:ClientSide.OnPreDispatch>11
                    $('<%=$this->tbCmbTA->ClientId%>').disabled='disabled';
                    Pace.stop();
                    Pace.start();
                </prop:ClientSide.OnPreDispatch>
               <prop:ClientSide.OnLoading>
                    $('<%=$this->tbCmbTA->ClientId%>').disabled='disabled';
                </prop:ClientSide.OnLoading>
                <prop:ClientSide.onComplete>                    
                    $('<%=$this->tbCmbTA->ClientId%>').disabled='';
                </prop:ClientSide.OnComplete>	
            </com:TActiveDropDownList>
        </div>         
        <div class="form-group">
            <label><strong>Semester :</strong></label>
            <com:TActiveDropDownList ID="tbCmbSemester" OnCallback="Page.changeTbSemester" CssClass="form-control" Width="100px;">
                <prop:ClientSide.OnPreDispatch>
                    $('<%=$this->tbCmbSemester->ClientId%>').disabled='disabled';
                    Pace.stop();
                    Pace.start();
                </prop:ClientSide.OnPreDispatch>
               <prop:ClientSide.OnLoading>
                    $('<%=$this->tbCmbSemester->ClientId%>').disabled='disabled';
                </prop:ClientSide.OnLoading>
                <prop:ClientSide.onComplete>                    
                    $('<%=$this->tbCmbSemester->ClientId%>').disabled='';
                </prop:ClientSide.OnComplete>	
            </com:TActiveDropDownList>
        </div>
    </div>
</div>