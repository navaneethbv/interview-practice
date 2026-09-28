class Solution:
    def findAnomalies(self, agents, actions, tickets):
        bad = set()
        opened_by = {}
        closed = set()
        last_ticket = {}
        for agent, action, ticket in zip(agents, actions, tickets):
            previous = last_ticket.get(agent)
            if previous is not None and previous != ticket and previous in opened_by and previous not in closed:
                bad.add(previous)
            last_ticket[agent] = ticket
            if action == "open":
                if ticket in opened_by or ticket in closed:
                    bad.add(ticket)
                opened_by.setdefault(ticket, agent)
            else:
                if ticket not in opened_by or ticket in closed or opened_by[ticket] != agent:
                    bad.add(ticket)
                closed.add(ticket)
        bad.update(ticket for ticket in opened_by if ticket not in closed)
        return list(bad)
