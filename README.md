with mynotes as (
  select env, domainid, 
         string_agg('- ' || note || ' (' || creationdate || ' - ' || createdby || ')', E'\n\n' order by creationdate desc) as notes 
  from notestable 
  where creationdate >= now() - interval '1 day' 
  group by 1,2
),

myactionlogs as (
  select env, caseid, 
         string_agg(actiontakenvalues || ' (' || actiontakentime || ' - ' || createdby || ')', E'\n\n' order by actiontakentime desc) as actionlogs 
  from actionlogtable 
  where actiontakentime >= now() - interval '1 day' 
  group by 1,2
),

combined_notes_logs as (
  select env, domainid as id, 'Note' as type, 
         creationdate as datetime, 
         '- ' || note || ' (' || creationdate || ' - ' || createdby || ')' as entry 
  from notestable 
  where creationdate >= now() - interval '1 day'

  union all

  select env, caseid as id, 'Action Log' as type, 
         actiontakentime as datetime, 
         actiontakenvalues || ' (' || actiontakentime || ' - ' || createdby || ')' as entry 
  from actionlogtable 
  where actiontakentime >= now() - interval '1 day'
),

final_combined as (
  select env, id, 
         string_agg(entry, E'\n\n' order by datetime desc) as combined_entries 
  from combined_notes_logs 
  group by env, id
)

select distinct 
  co.region as "Region",
  si.name as "Site",
  a.name as "Asset",
  a.shortname as "Tower",
  a.model as "Model",
  st2.description as "Tower State",
  case
    when c.state = '2' then 'In Progress'
    when c.state = '5' then 'Closed'
    else 'Other' 
  end as "Case State",
  c.createdtime as "Time",
  c.responsiblealarm as "EM",
  c.eventname as "EMDescription",
  fc.combined_entries as "Notes and Action Logs"

from cases c
inner join asset_info a on a.assetid = c.assetid and a.env = c.env
inner join state_info_last st on st.assetid = a.assetid
inner join statusescada st2 on st.ieccode = st2.idautomation
inner join site_info si on si.siteid = c.siteid and si.env = c.env
inner join countries co on co.code2 = si.countrycode
left join final_combined fc on c.id::text = fc.id and c.env = fc.env

where
c.responsiblealarm not in ('351')
and (fc.combined_entries like '%Rescue Bypass%')

order by c.createdtime asc;

