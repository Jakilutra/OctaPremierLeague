=REGEXREPLACE(
	"[TABLE][TR]"
		&"[TH][FONT='Georgia'][COLOR=#9365B8]Rank[/FONT][/COLOR][/TH]"
		&"[TH][FONT='Georgia'][COLOR=#9365B8]Logo[/FONT][/COLOR][/TH]"
		&"[TH][FONT='Georgia'][COLOR=#9365B8]Team Name[/FONT][/COLOR][/TH]"
		&"[TH][FONT='Georgia'][COLOR=#9365B8]Manager"&CHAR(13)&"Assistant[/COLOR][/FONT][/TH]"
		&"[TH][FONT='Georgia'][COLOR=#D14841]Team "&CHAR(13)&"Wins[/COLOR][/FONT][/TH]"
		&"[TH][FONT='Georgia'][COLOR=#D14841]Team "&CHAR(13)&"Losses[/COLOR][/FONT][/TH]"
		&"[TH][FONT='Georgia'][COLOR=#D14841]Team "&CHAR(13)&"Ties[/COLOR][/FONT][/TH]"
		&"[TH][FONT='Georgia'][COLOR=#D14841]Team Points[/COLOR][/FONT][/TH]"
		&"[TH][FONT='Georgia'][COLOR=#2C82C9]Indv."&CHAR(13)&"Wins[/COLOR][/FONT][/TH]"&CHAR(13)
		&"[TH][FONT='Georgia'][COLOR=#2C82C9]Indv."&CHAR(13)&"Losses[/COLOR][/FONT][/TH]"
		&"[TH][FONT='Georgia'][COLOR=#2C82C9]Blank Wins[/COLOR][/FONT][/TH]"
		&"[TH][FONT='Georgia'][COLOR=#2C82C9]Blank Losses[/COLOR][/FONT][/TH]"
		&"[TH][FONT='Georgia'][COLOR=#2C82C9]Blank Ties[/COLOR][/FONT][/TH]"
		&"[TH][FONT='Georgia'][COLOR=#2C82C9]Fail2P"&CHAR(13)&"Points[/COLOR][/FONT][/TH]"
	&"[/TR]"
	&SUBSTITUTE("[TR]"&JOIN("[/FONT][/CENTER][/TD][/TR][TR]",
		QUERY(TRANSPOSE(ARRAYFORMULA("[/FONT][/CENTER][/TD][TD][CENTER][FONT='Georgia']"&SORT({
			ARRAYFORMULA("[SIZE=7][B]"&RANK(
				(N(ISNUMBER(FIND("Win",U6:U13)))*20000
				+N(ISNUMBER(FIND("Tie",U6:U13)))*10000
				+REGEXEXTRACT(U6:U13,"(\d\d?)-")*100
				-IFERROR(REGEXEXTRACT(U6:U13,"-(\d\d?)]"),0)*2+(REGEXEXTRACT(U6:U13,"(\d\d?)-")+REGEXEXTRACT(U6:U13,"-(\d\d?)")-Config!$F$4))
				,SPLIT(JOIN(",",ARRAYFORMULA(
				(N(ISNUMBER(FIND("Win",U6:U13)))*20000
				+N(ISNUMBER(FIND("Tie",U6:U13)))*10000
				+REGEXEXTRACT(U6:U13,"(\d\d?)-")*100
				-IFERROR(REGEXEXTRACT(U6:U13,"-(\d\d?)]"),0)*2+(REGEXEXTRACT(U6:U13,"(\d\d?)-")+REGEXEXTRACT(U6:U13,"-(\d\d?)")-Config!$F$4)))),","),0)&"[/B][/SIZE]"
			),
			ARRAYFORMULA("[IMG width='80px']"&$AK$6:$AK$13&"[/IMG]"),"[B][COLOR="&$AJ$6:$AJ$13&"]"&$B$6:$B$13&"[/COLOR][/B]",
			ARRAYFORMULA(SUBSTITUTE("@"&$C$6:$C$13,CHAR(10),CHAR(10)&" @")),
			ARRAYFORMULA("[SIZE=6]"&N(ISNUMBER(FIND("Win",U6:U13)))&"[/SIZE]"),
			ARRAYFORMULA("[SIZE=6]"&N(ISNUMBER(FIND("Loss",U6:U13)))&"[/SIZE]"),
			ARRAYFORMULA("[SIZE=6]"&N(ISNUMBER(FIND("Tie",U6:U13)))&"[/SIZE]"),
			ARRAYFORMULA("[SIZE=7][B]"&N(ISNUMBER(FIND("Win",U6:U13)))*2+N(ISNUMBER(FIND("Tie",U6:U13)))&"[/B][/SIZE]"),
			ARRAYFORMULA("[SIZE=5][B]"&REGEXEXTRACT(U6:U13,"(\d\d?)-")&"[/B][/SIZE]"),
			ARRAYFORMULA("[SIZE=5]"&REGEXEXTRACT(U6:U13,"-(\d\d?)")&"[/SIZE]"),
			ARRAYFORMULA(IFERROR(REGEXEXTRACT(U6:U13,"\[(\d\d?)-"),0)),
			ARRAYFORMULA(IFERROR(REGEXEXTRACT(U6:U13,"-(\d\d?)\]"),0)),
			ARRAYFORMULA(Config!$F$4-(REGEXEXTRACT(U6:U13,"(\d\d?)-")+REGEXEXTRACT(U6:U13,"-(\d\d?)"))),
			ARRAYFORMULA("[B]"&IFERROR(REGEXEXTRACT(U6:U13,"-(\d\d?)\]"),0)*2+(Config!$F$4-(REGEXEXTRACT(U6:U13,"(\d\d?)-")+REGEXEXTRACT(U6:U13,"-(\d\d?)")))&"[/B]")
		},1,1))),,100000)
	)&"[/FONT][/CENTER][/TD][/TR][/TABLE]","[TR][/FONT][/CENTER][/TD]","[TR]"),"\n",CHAR(13)
)
