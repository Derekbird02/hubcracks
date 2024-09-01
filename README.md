SELECT
  $__timeGroup(createdtime, '1d') AS time, -- Adjust the interval as needed (e.g., '1h', '1w')
  sg.sitegroupname AS sitegroup,
  COUNT(*) AS count
FROM cases al
INNER JOIN asset_info a ON al.assetid = a.assetid
INNER JOIN site_info s ON s.siteid = a.siteid
INNER JOIN listitems ls ON ls.id = al.state AND ls.item = 'CASE_STATE'
INNER JOIN listitems ls2 ON ls2.id = al.type AND ls2.item = 'CASE_TYPE'
INNER JOIN countries co ON co.code2 = s.countrycode
INNER JOIN sitegroup_info sg ON sg.siteid = s.siteid
WHERE assettype = 'Turbine'
AND type = '2'
AND $__timeFilter(createdtime)
AND sg.sitegroupname IN ('Europe1', 'Europe2', 'Europe3')
GROUP BY time, sg.sitegroupname
ORDER BY time, sg.sitegroupname;
