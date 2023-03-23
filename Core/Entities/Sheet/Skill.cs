using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class Skill : BaseEntity
    {
        public bool Selected { get; set; }
        public string Name { get; set; }
        public int Value { get; set; }
        public string Modificator { get; set; }
    }
}